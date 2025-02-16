const formEl = document.getElementById("formEl"),
  colorInput = document.getElementById("color-input"),
  colorDiv = document.getElementById("color-div"),
  nameDiv = document.getElementById("name-div"),
  modal = document.getElementById("loadingModal")

const selectedText = document.getElementById("selectedText"),
  dropdownMenu = document.getElementById("dropdownMenu"),
  dropdownButton = document.getElementById("dropdownButton"),
  options = dropdownMenu.querySelectorAll("li")
const menuItems = Array.from(options)
const copyModal = document.getElementById("copyModal")

const htmlElement = document.documentElement,
  lightModeBtn = document.getElementById('light-mode-btn'),
  darkModeBtn = document.getElementById('dark-mode-btn')

let focusedIndex = -1

document.addEventListener("DOMContentLoaded", function () {
  getThemes("567c8d","monochrome-light")
})
    
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark')
  }
lightModeBtn.addEventListener('click', () => {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  })
darkModeBtn.addEventListener('click', () => {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  })

formEl.addEventListener("submit",(e)=>{
  e.preventDefault();
  modal.classList.remove("hidden");
  const color= colorInput.value.substring(1)
  const mode= selectedText.textContent.toLowerCase().trim()
  getThemes(color,mode)
}) 

function getThemes(colorOption,modeOption){
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorOption}&mode=${modeOption}&count=5`)
  .then(res=> res.json())
  .then(data=> {
    colorDiv.innerHTML=""
    nameDiv.innerHTML=""
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden")
    }
    data.colors.forEach(color => {
      colorDiv.innerHTML+=`
          <div id="${color.hex.value}" class="cursor-pointer" style="background-color:${color.hex.value};" title="Click copy"></div>
          `
      nameDiv.innerHTML+=`
          <p id="${color.hex.value}" class="cursor-pointer" title="Click to copy">${color.hex.value}</p>
          `
            })
        })
}  

dropdownButton.addEventListener("click", function () {
  const isExpanded = dropdownButton.getAttribute("aria-expanded") === "true"
    dropdownButton.setAttribute("aria-expanded", !isExpanded)
  dropdownMenu.classList.toggle("hidden")
  if (!dropdownMenu.classList.contains("hidden")) {
    focusedIndex = 0;
    menuItems[focusedIndex].focus()  
  }
  else{
    dropdownButton.focus()
  }
})

dropdownButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        dropdownButton.click()
    }
})

dropdownMenu.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") {
      event.preventDefault()
      focusedIndex = (focusedIndex + 1) % menuItems.length;
      menuItems[focusedIndex].focus();
  } else if (event.key === "ArrowUp") {
      event.preventDefault()
      focusedIndex = (focusedIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[focusedIndex].focus();
  } else if (event.key === "Escape") {
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.add("hidden");
      dropdownButton.focus()
  }
})
options.forEach(option => {
  
  option.addEventListener("click", function () {
    selectedText.textContent = this.textContent; 
    document.querySelectorAll(".checkmark").forEach(icon => icon.classList.add("hidden"))
      document.querySelectorAll("li").forEach(icon =>         
      icon.classList.remove("font-bold"))
      this.querySelector(".checkmark").classList.remove("hidden")
      this.classList.add("font-bold")
      dropdownMenu.classList.add("hidden");
    })
})
document.addEventListener("click", function (event) {
  if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.add("hidden")
    dropdownButton.focus()

  }
  if(event.target.closest(".color-div")||event.target.closest(".name-div")){
    navigator.clipboard.writeText(event.target.id).then(() => {
      copyModal.classList.remove("hidden")
      setTimeout(() => {
        copyModal.classList.add("hidden")
      }, 2000)
    })
  }
})
  
  