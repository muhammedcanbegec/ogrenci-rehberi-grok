async function sor() {
  const soru = document.getElementById("soru").value;
  const cevapDiv = document.getElementById("cevap");
  if (!soru) return;
  cevapDiv.innerText = "AI cevaplıyor...";
  const res = await fetch(`/api/cevap?soru=${encodeURIComponent(soru)}`);
  const data = await res.json();
  cevapDiv.innerText = data.cevap;
}
