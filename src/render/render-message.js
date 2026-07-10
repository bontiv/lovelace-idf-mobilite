import { idfMobiliteLineRef } from "../referentiel-des-lignes-filtered.js";

export function renderMessages(model, config, images, noScroll = false) {
  if (!model || !model.lines || model.lines.length === 0) return "";

  const collected = {
    Information: [],
    Perturbation: [],
    Commercial: []
  };

  const lineMessagesSet = new Set();

  // ------------------------------------------------------------
  // 1) Messages de ligne
  // ------------------------------------------------------------
  for (const lineBlock of model.lines) {
    if (!lineBlock?.line) continue;

    const messages = lineBlock.line.messages || [];
    for (const msg of messages) {

      const raw = extractRawText(msg);
      const cleaned = cleanHtml(raw);

      const normalized = normalizeMessageForComparison(cleaned);
      lineMessagesSet.add(normalized);

      pushMessage(
        collected,
        { ...msg, cleanedText: cleaned, normalized },
        {
          type: "line",
          id: lineBlock.line.id,
          name: lineBlock.line.name
        },
        images
      );
    }
  }

  // ------------------------------------------------------------
  // 2) Messages de station
  // ------------------------------------------------------------
  for (const lineBlock of model.lines) {
    for (const station of lineBlock.stations || []) {
      for (const msg of station.messages || []) {

        const raw = extractRawText(msg);
        const cleaned = cleanHtml(raw);

        const normalized = normalizeMessageForComparison(cleaned);

        if (lineMessagesSet.has(normalized)) continue;
        lineMessagesSet.add(normalized);

        pushMessage(
          collected,
          { ...msg, cleanedText: cleaned, normalized },
          {
            type: "station",
            id: station.id,
            name: station.name
          },
          images
        );
      }
    }
  }

  // ------------------------------------------------------------
  // 3) TRI par date décroissante dans chaque catégorie
  // ------------------------------------------------------------
  const sortedPerturbations = sortByDateDesc(collected.Perturbation);
  const sortedInformation = sortByDateDesc(collected.Information);
  const sortedCommercial = sortByDateDesc(collected.Commercial);

  // ------------------------------------------------------------
  // 4) FILTRAGE SELON CONFIG
  // ------------------------------------------------------------
  const filteredPerturbations = filterMessagesByConfig(sortedPerturbations, config);
  const filteredInformation = filterMessagesByConfig(sortedInformation, config);
  const filteredCommercial = filterMessagesByConfig(sortedCommercial, config);

  // ------------------------------------------------------------
  // 5) Construction HTML final
  // ------------------------------------------------------------

  // On concatène dans l'ordre : Perturbation → Information → Commercial
  const allMessages = [
    ...filteredPerturbations,
    ...filteredInformation,
    ...filteredCommercial
  ];

  if (allMessages.length === 0) return "";

  if (noScroll) {
    // Affichage statique : un <div> par message avec espacement
    return allMessages
      .map(m => `<div class="message-item">${m.text}</div>`)
      .join("");
  } else {
    // Affichage défilant : tout concaténé avec •
    const concatMessage = allMessages.map(m => m.text).join(" • ");
    return `<span class="message-block">${concatMessage}</span>`;
  }
}

// ------------------------------------------------------------
// Tri par date de publication décroissante (plus récent en premier)
// ------------------------------------------------------------
function parseNavitiaDate(dateStr) {
  if (!dateStr) return 0;
  // Format Navitia : "YYYYMMDDTHHmmss" → "YYYY-MM-DDTHH:mm:ss"
  const s = String(dateStr);
  if (s.length >= 15) {
    const iso = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(11, 13)}:${s.slice(13, 15)}`;
    const ts = Date.parse(iso);
    return isNaN(ts) ? 0 : ts;
  }
  const ts = Date.parse(s);
  return isNaN(ts) ? 0 : ts;
}

function sortByDateDesc(messages) {
  return [...messages].sort((a, b) => {
    const da = parseNavitiaDate(a.updated_at || a.published_at);
    const db = parseNavitiaDate(b.updated_at || b.published_at);
    return db - da;
  });
}

// ------------------------------------------------------------
// FILTRE SELON CONFIG
// ------------------------------------------------------------
function filterMessagesByConfig(messages, config) {
  return messages.filter(m => {
    // 1) Messages d'information (network)
    if (m.type === "information" && !config.display_info_message) {
      return false;
    }

    // 2) SIGNIFICANT_DELAYS
    if (m.severity === "SIGNIFICANT_DELAYS" && !config.display_delays_message) {
      return false;
    }

    // 3) NO_SERVICE
    if (m.severity === "NO_SERVICE" && !config.display_no_service_message) {
      return false;
    }

    return true;
  });
}

// ------------------------------------------------------------
// EXTRACTION DU TEXTE NAVITIA
// ------------------------------------------------------------
function extractRawText(msg) {
  if (msg.text) return msg.text;
  if (msg.html) return msg.html;
  if (msg.message) return msg.message;
  if (msg.content) return msg.content;

  if (Array.isArray(msg.messages)) {
    for (const m of msg.messages) {
      if (m.text) return m.text;
      if (m.html) return m.html;
    }
  }

  return "";
}

// ------------------------------------------------------------
// Normalisation pour la déduplication
// ------------------------------------------------------------
function normalizeMessageForComparison(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/#/g, " ")
    .replace(/Lignes?\s*\d+(,\s*\d+)*/gi, "")
    .replace(/^\d+\s*/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// ------------------------------------------------------------
// pushMessage (utilise cleanedText)
// ------------------------------------------------------------
function getSeverityBadge(severity, type) {
  // type === "information" → message réseau
  if (type === "information") {
    return `<span class="badge badge-info">ℹ️</span>`;
  }

  switch (severity) {
    case "NO_SERVICE":
      return `<span class="badge badge-noservice">❌</span>`;
    case "SIGNIFICANT_DELAYS":
      return `<span class="badge badge-delays">⚠️</span>`;
    default:
      return `<span class="badge badge-other">🛈</span>`;
  }
}

function pushMessage(collected, msg, context, images) {
  const baseText = msg.cleanedText;
  const normalized = msg.normalized;

  const targetArray =
    msg.type === "information"
      ? collected.Information
      : (msg.severity === "NO_SERVICE" || msg.severity === "SIGNIFICANT_DELAYS")
        ? collected.Perturbation
        : collected.Commercial;

  if (targetArray.some(e => e.normalized === normalized)) {
    return;
  }

  let prefixHtml = "";

  // ------------------------------------------------------------
  // CONTEXTE LIGNE → icône IDFM officielle
  // ------------------------------------------------------------
  if (context.type === "line") {
    let lineData = null;
    let lineCode = null;

    // msg.line_id peut contenir "IDFM:C02344"
    if (msg.line_id) {
      const m = msg.line_id.match(/IDFM:(C\d+)/);
      if (m) lineCode = m[1];
    }

    // Recherche dans ton référentiel minimal
    idfMobiliteLineRef().every((line) => {
      if (line.id_line === lineCode) {
        lineData = line;
        return false;
      }
      return true;
    });

    if (lineData) {
       if (lineData.icon)
         prefixHtml = `<img class="message-line-icon" src = "${images[`${lineData.transportmode}/${lineData.icon}`]}" alt = "${lineData.shortname_line}" class="${lineData.type}-image" />`
       else
          prefixHtml = `<div class="message-line-pill" style="color: #${lineData.textcolourweb_hexa};background-color:#${lineData.colourweb_hexa}">${lineData.shortname_line}</div>`
    } else {
      // fallback texte
      prefixHtml = `
        <span class="message-line-icon-fallback">🚌</span>
        <strong>${context.name}</strong>
      `;
    }
  }

  // ------------------------------------------------------------
  // CONTEXTE STATION
  // ------------------------------------------------------------
  else if (context.type === "station") {
    prefixHtml = `<span class="message-stop-icon">🚏</span> <strong>${context.name}</strong> `;
  }

  // ------------------------------------------------------------
  // BADGE + TEXTE
  // ------------------------------------------------------------
  const badge = getSeverityBadge(msg.severity, msg.type);
  const text = `${prefixHtml}${badge} ${baseText}`;

  targetArray.push({
    text,
    normalized,
    type: msg.type,
    severity: msg.severity,
    updated_at: msg.updated_at || null,
    published_at: msg.published_at || null
  });
}


// ------------------------------------------------------------
// cleanHtml (décodage + suppression InfoTrafic)
// ------------------------------------------------------------
function cleanHtml(html) {
  if (!html) return "";

  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  let text = txt.value;

  text = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const idx = text.toLowerCase().indexOf("#infotrafic");
  if (idx !== -1) {
    text = text.substring(idx + "#infotrafic".length);
    text = text.replace(/^\s*-\s*/, "").trim();
  }

  return text;
}

function getFolderFromModes(mode) {
  mode = (mode || "").toLowerCase();

  if (mode === "bus") return "bus/";
  if (mode === "noctilien") return "noctilien/";
  if (mode === "rail") return "rail/";
  if (mode === "funicular") return "funicular/";

  return "";
}
