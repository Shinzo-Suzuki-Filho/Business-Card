
        // Função para salvar contato
        function saveContact() {
            const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Shinzo Suzuki
ORG:CriArtWeb
TITLE:Desenvolvedor Web Front-End
TEL:+5582988886434
EMAIL:agencia.criartweb@gmail.com
URL:https://instagram.com/agencia.criartweb/
END:VCARD`;

            const blob = new Blob([vCard], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'shinzo-suzuki-criartweb.vcf';
            link.click();
            window.URL.revokeObjectURL(url);
        }

        // Função para compartilhar cartão
        async function shareCard() {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Shinzo Suzuki - Desenvolvedor Web Front-End',
                        text: 'Conheça o trabalho da CriArtWeb - Desenvolvimento Web profissional',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Erro ao compartilhar:', err);
                    copyToClipboard();
                }
            } else {
                copyToClipboard();
            }
        }

        function copyToClipboard() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Link copiado para a área de transferência!');
            });
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Criar partículas flutuantes
        function createParticles() {
            const particles = document.querySelector('.particles');
            const particleCount = window.innerWidth < 768 ? 15 : 25;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particles.appendChild(particle);
            }
        }

        // Efeito de paralaxe no cartão
        function handleMouseMove(e) {
            if (window.innerWidth < 768) return;

            const card = document.querySelector('.business-card');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }

        function resetCardTransform() {
            const card = document.querySelector('.business-card');
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg)';
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            const card = document.querySelector('.business-card');
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', resetCardTransform);

            // Adicionar estilos de animação CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });

        // Otimização para dispositivos móveis
        if ('ontouchstart' in window) {
            document.body.style.cursor = 'pointer';
        }
    