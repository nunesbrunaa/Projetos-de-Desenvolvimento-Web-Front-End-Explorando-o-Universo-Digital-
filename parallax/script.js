const cabecalho = document.getElementById('parallax-header');

window.addEventListener('scroll', () =>{
    let elementosParallax = document.querySelectorAll('.parallax');
    elementosParallax.forEach((element) => {
        
        let speed = element.getAttribute('data-speed');
        let verticalDesloc = window.pageYOffset + speed / 50;
        console.log(element.style.backgroundPositionY);
        element.style.backgroundPositionY = '${verticalDesloc}px';
    })
})