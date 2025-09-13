// Debug script to test certificate functionality
console.log('Certificate Debug Script Loaded');

// Test if DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Check if certificate cards exist
    const certificateCards = document.querySelectorAll('.certificate-card-ultra');
    console.log('Found certificate cards:', certificateCards.length);
    
    if (certificateCards.length === 0) {
        console.error('No certificate cards found!');
        return;
    }
    
    // Test first certificate card
    const firstCard = certificateCards[0];
    console.log('First certificate card:', firstCard);
    
    // Check data attributes
    console.log('PDF path:', firstCard.getAttribute('data-pdf'));
    console.log('Verify URL:', firstCard.getAttribute('data-verify'));
    console.log('Category:', firstCard.getAttribute('data-category'));
    
    // Check if buttons exist
    const downloadBtn = firstCard.querySelector('.download-btn-ultra');
    const viewBtn = firstCard.querySelector('.view-btn-ultra');
    
    console.log('Download button found:', !!downloadBtn);
    console.log('View button found:', !!viewBtn);
    
    // Check certificate data elements
    const certTitle = firstCard.querySelector('.cert-title-ultra');
    const certDescription = firstCard.querySelector('.cert-description-ultra');
    const certInstitution = firstCard.querySelector('.cert-institution-ultra');
    const certPlatform = firstCard.querySelector('.cert-platform-ultra');
    const certDate = firstCard.querySelector('.cert-date-ultra');
    const certLevel = firstCard.querySelector('.cert-level-ultra span');
    const certImage = firstCard.querySelector('.cert-image-ultra');
    
    console.log('Certificate elements found:');
    console.log('- Title:', !!certTitle, certTitle?.textContent);
    console.log('- Description:', !!certDescription, certDescription?.textContent);
    console.log('- Institution:', !!certInstitution, certInstitution?.textContent);
    console.log('- Platform:', !!certPlatform, certPlatform?.textContent);
    console.log('- Date:', !!certDate, certDate?.textContent);
    console.log('- Level:', !!certLevel, certLevel?.textContent);
    console.log('- Image:', !!certImage, certImage?.src);
    
    // Test if event listeners are working
    if (downloadBtn) {
        console.log('Testing download button...');
        downloadBtn.addEventListener('click', function(e) {
            console.log('Download button clicked!');
            e.preventDefault();
            
            const certPdf = firstCard.getAttribute('data-pdf');
            const certTitle = firstCard.querySelector('.cert-title-ultra')?.textContent || 'Certificate';
            
            console.log('PDF path:', certPdf);
            console.log('Certificate title:', certTitle);
            
            if (certPdf) {
                console.log('Creating download link...');
                const link = document.createElement('a');
                link.href = certPdf;
                link.download = `${certTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
                link.target = '_blank';
                
                console.log('Download link created:', link.href);
                console.log('Download filename:', link.download);
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log('Download triggered successfully!');
            } else {
                console.error('No PDF path found!');
            }
        });
    }
    
    if (viewBtn) {
        console.log('Testing view button...');
        viewBtn.addEventListener('click', function(e) {
            console.log('View button clicked!');
            
            // Get certificate data from the card
            const certTitle = firstCard.querySelector('.cert-title-ultra')?.textContent || 'Certificate';
            const certDescription = firstCard.querySelector('.cert-description-ultra')?.textContent || '';
            const certInstitution = firstCard.querySelector('.cert-institution-ultra')?.textContent || '';
            const certPlatform = firstCard.querySelector('.cert-platform-ultra')?.textContent || '';
            const certDate = firstCard.querySelector('.cert-date-ultra')?.textContent || '';
            const certLevel = firstCard.querySelector('.cert-level-ultra span')?.textContent || '';
            const certCategory = firstCard.getAttribute('data-category') || '';
            const certImage = firstCard.querySelector('.cert-image-ultra')?.src || '';
            const certPdf = firstCard.getAttribute('data-pdf') || '';
            const certVerify = firstCard.getAttribute('data-verify') || '';
            
            console.log('Certificate data extracted:');
            console.log('- Title:', certTitle);
            console.log('- Description:', certDescription);
            console.log('- Institution:', certInstitution);
            console.log('- Platform:', certPlatform);
            console.log('- Date:', certDate);
            console.log('- Level:', certLevel);
            console.log('- Category:', certCategory);
            console.log('- Image:', certImage);
            console.log('- PDF:', certPdf);
            console.log('- Verify:', certVerify);
            
            // Test if showCertificateModal function exists
            if (typeof showCertificateModal === 'function') {
                console.log('showCertificateModal function exists, calling it...');
                showCertificateModal({
                    title: certTitle,
                    description: certDescription,
                    institution: certInstitution,
                    platform: certPlatform,
                    date: certDate,
                    level: certLevel,
                    category: certCategory,
                    image: certImage,
                    pdf: certPdf,
                    verify: certVerify
                });
            } else {
                console.error('showCertificateModal function not found!');
            }
        });
    }
    
    console.log('Certificate debug setup complete!');
});

// Check if main.js is loaded
console.log('Main.js loaded:', typeof showCertificateModal !== 'undefined');
console.log('showCertificateModal function:', typeof showCertificateModal);
