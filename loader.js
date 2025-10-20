// URL例: index.html?sketch=marble
const params = new URLSearchParams(window.location.search);
const sketch = params.get("sketch") || "marble"; // デフォルト: marble

const script = document.createElement("script");
script.src = `../projects/${sketch}.js`;
document.body.appendChild(script);
