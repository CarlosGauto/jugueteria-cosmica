console.log('🆗: Módulo PageNosotros cargado.');

class PageNosotros {

    static async init () {
        console.log('PageNosotros.init()');
        const bntShow = document.getElementById('btn-show') 
        bntShow.addEventListener('click',this.newText)
        this.showText()
    }

    static newText(){
       const newText = document.getElementById('newText')
       const textShow = document.getElementById('text-dinamic')
       const parrafo = document.createElement('p')

       parrafo.innerHTML = newText.value
       textShow.innerHTML = ''
       textShow.appendChild(parrafo)
       PageNosotros.showText()
    }
    
    static showText(){
        const playText = document.getElementsByClassName('star-wars-intro__text-container')[0]
        playText.classList.add("play");
       setTimeout(() => {playText.classList.remove("play");}, 10000);
    }
}

export default PageNosotros;
