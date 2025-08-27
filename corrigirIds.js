const fs = require("fs");

// Caminho do db.json (ajusta se precisar)
const dbPath = "./db.json";

// Lê o arquivo
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// Função para corrigir ids recursivamente em qualquer array
function corrigirIds(obj) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(item => {
        if (item.id && typeof item.id === "string" && !isNaN(item.id)) {
          item.id = parseInt(item.id, 16);
        }
        return corrigirIds(item);
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      corrigirIds(obj[key]);
    }
  }
  return obj;
}

// Corrige os ids
const dbCorrigido = corrigirIds(db);

// Salva de volta no arquivo
fs.writeFileSync(dbPath, JSON.stringify(dbCorrigido, null, 2), "utf8");

console.log("✅ Todos os IDs string foram convertidos para número!");
