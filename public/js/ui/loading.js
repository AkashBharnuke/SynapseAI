const loadingSection = document.getElementById("loadingSection");
const analyzeBtn = document.getElementById("analyzeBtn");

function showLoading() {
	loadingSection.classList.remove("hidden"); 
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing..."
}

function hideLoading() {
    loadingSection.classList.add("hidden"); 
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "Analyze"
}
export { showLoading, hideLoading };