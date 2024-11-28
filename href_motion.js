document.querySelectorAll('.scale_bigger').forEach(textElement => {
    textElement.addEventListener('mouseover', () => {
        textElement.style.transform = 'scale(1.5)';
        textElement.style.color = '#007bff';
    });

    textElement.addEventListener('mouseout', () => {
        textElement.style.transform = 'scale(1)';
        textElement.style.color = 'black';
    });
});