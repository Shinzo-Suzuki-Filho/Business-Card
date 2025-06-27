// Copy contact info to clipboard and show confirmation message
document.getElementById('copy-contact').addEventListener('click', () => {
  const phone = document.querySelector('.contact-list a[href^="tel"]').textContent.trim();
  const email = document.querySelector('.contact-list a[href^="mailto"]').textContent.trim();
  const instagram = document.getElementById('instagram-link').href;
  const whatsapp = document.getElementById('whatsapp-link').href;
  const company = document.querySelector('.company-name').textContent.trim();

  const contactInfo = `Telefone: ${phone}\nEmail: ${email}\nInstagram: ${instagram}\nWhatsApp: ${whatsapp}\nEmpresa: ${company}`;

  navigator.clipboard.writeText(contactInfo).then(() => {
    const message = document.getElementById('copy-message');
    message.hidden = false;
    setTimeout(() => {
      message.hidden = true;
    }, 3000);
  }).catch(err => {
    alert('Erro ao copiar o contato para a área de transferência.');
  });
});
