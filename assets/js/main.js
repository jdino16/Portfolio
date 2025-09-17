// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const desktopNav = document.querySelector('.hidden.md\\:flex');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Ensure mobile menu is properly hidden on desktop
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('hidden');
    }
  });
  
  // Hide mobile menu when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('hidden');
      // Ensure desktop nav is visible
      if (desktopNav) {
        desktopNav.style.display = 'flex';
        desktopNav.style.visibility = 'visible';
      }
    } else {
      // Hide desktop nav on mobile
      if (desktopNav) {
        desktopNav.style.display = 'none';
      }
    }
  });
}

// Main DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', function() {
  // Ensure desktop navigation is visible on page load
  if (window.innerWidth >= 768 && desktopNav) {
    desktopNav.style.display = 'flex';
    desktopNav.style.visibility = 'visible';
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Certificate Filter Functionality
  console.log('Initializing certificate functionality...');
  const filterButtons = document.querySelectorAll('.filter-btn-ultra');
  const certificateCards = document.querySelectorAll('.certificate-card-ultra');
  
  console.log('Found filter buttons:', filterButtons.length);
  console.log('Found certificate cards:', certificateCards.length);
  
  if (filterButtons.length === 0 || certificateCards.length === 0) {
    console.log('No filter buttons or certificate cards found, skipping certificate functionality');
    return;
  }
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards with animation
      certificateCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          // Show card
          card.style.display = 'block';
          card.classList.remove('hidden');
          card.classList.add('show');
          
          // Stagger animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 50);
        } else {
          // Hide card
          card.classList.add('hidden');
          card.classList.remove('show');
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Certificate view button functionality
  console.log('Setting up certificate view buttons...');
  certificateCards.forEach((card, index) => {
    const viewBtn = card.querySelector('.view-btn-ultra');
    if (viewBtn) {
      console.log(`Setting up view button for card ${index + 1}`);
      viewBtn.addEventListener('click', function() {
        console.log(`View button clicked for card ${index + 1}`);
        // Add a subtle animation to the view button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.1)';
        }, 100);
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        // Get certificate data from the card
        const certTitle = card.querySelector('.cert-title-ultra')?.textContent || 'Certificate';
        const certDescription = card.querySelector('.cert-description-ultra')?.textContent || '';
        const certInstitution = card.querySelector('.cert-institution-ultra')?.textContent || '';
        const certPlatform = card.querySelector('.cert-platform-ultra')?.textContent || '';
        const certDate = card.querySelector('.cert-date-ultra')?.textContent || '';
        const certLevel = card.querySelector('.cert-level-ultra span')?.textContent || '';
        const certCategory = card.getAttribute('data-category') || '';
        const certImage = card.querySelector('.cert-image-ultra')?.src || '';
        const certPdf = card.getAttribute('data-pdf') || '';
        const certVerify = card.getAttribute('data-verify') || '';
        
        console.log('Certificate data extracted:', {
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
        
        // Show certificate modal
        console.log('Calling showCertificateModal...');
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
      });
    }
    
    // Certificate verification button functionality
    const verifyBtn = card.querySelector('.verify-btn-ultra');
    if (verifyBtn) {
      console.log(`Setting up verify button for card ${index + 1}`);
      verifyBtn.addEventListener('click', function(e) {
        console.log(`Verify button clicked for card ${index + 1}`);
        e.preventDefault();
        
        // Add a subtle animation to the verify button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.1)';
        }, 100);
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        // Get verification URL from the card
        const certVerify = card.getAttribute('data-verify') || '';
        const certTitle = card.querySelector('.cert-title-ultra')?.textContent || 'Certificate';
        
        console.log('Verification URL:', certVerify);
        console.log('Certificate title:', certTitle);
        
        if (certVerify) {
          // Open verification link in new tab
          window.open(certVerify, '_blank', 'noopener,noreferrer');
          
          console.log('Verification page opened successfully');
          
          // Show success message
          showVerifySuccess(certTitle);
        } else {
          console.warn('No verification URL specified for this certificate');
        }
      });
    }
  });
  
  // Add hover effects for better interactivity
  certificateCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) rotateX(5deg) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Initialize 3D effects and enhanced animations
  addFloating3D();
  initHeroAnimations();
  initParallaxEffects();
  initScrollAnimations();
  initAdvancedButtonAnimations();
  initIconAnimations();
  optimizeButtonPerformance();
  initMagneticNavigation();

  // Initialize mobile menu animations
  initMobileMenuAnimations();
  initContactIconAnimations();
  initAboutSectionAnimations();
  initSmoothScrollToAbout();

  // Initialize all About section features
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize section animations
  initSectionAnimations();
  
  // Initialize scroll effects
  initAboutScrollEffects();
  
  // Initialize GSAP About animations
  initGSAPAboutAnimations();
  
  // Initialize GSAP Skills animations
  initGSAPSkillsAnimations();
  
  // Initialize skill tabs
  initSkillTabs();
  
  // Initialize circular progress rings
  initCircularProgressRings();
  
  // Initialize GSAP Projects animations
  initGSAPProjectsAnimations();
  
  // Initialize interactions when About section becomes visible
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          initTechInteractions();
          initContactItemInteractions();
        }, 1000);
      }
    });
  }, { threshold: 0.3 });
  
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
});

// Download Success Notification
function showDownloadSuccess(certTitle) {
  const notification = document.createElement('div');
  notification.className = 'download-success-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10001;
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    border: 1px solid rgba(16, 185, 129, 0.3);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  notification.innerHTML = `
    <i class="ri-download-2-line" style="font-size: 18px;"></i>
    <span>${certTitle} downloaded successfully!</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Verify Success Notification
function showVerifySuccess(certTitle) {
  const notification = document.createElement('div');
  notification.className = 'verify-success-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10001;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    border: 1px solid rgba(59, 130, 246, 0.3);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  notification.innerHTML = `
    <i class="ri-external-link-line" style="font-size: 18px;"></i>
    <span>${certTitle} verification opened in new tab!</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Certificate Modal Functionality
function showCertificateModal(certData) {
  console.log('showCertificateModal called with data:', certData);
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'cert-modal-overlay';
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'cert-modal-content';
  modalContent.style.cssText = `
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
    border: 1px solid rgba(192, 132, 252, 0.3);
    border-radius: 20px;
    padding: 30px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    transform: scale(0.8);
    transition: transform 0.3s ease;
  `;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="ri-close-line"></i>';
  closeBtn.style.cssText = `
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(192, 132, 252, 0.2);
    border: 1px solid rgba(192, 132, 252, 0.3);
    color: #c084fc;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.3s ease;
  `;

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = 'rgba(192, 132, 252, 0.3)';
    closeBtn.style.transform = 'scale(1.1)';
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'rgba(192, 132, 252, 0.2)';
    closeBtn.style.transform = 'scale(1)';
  });

  // Create modal HTML
  modalContent.innerHTML = `
    <div class="cert-modal-header" style="margin-bottom: 25px; text-align: center;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
        <div style="
          background: linear-gradient(135deg, #c084fc, #6d28d9);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          box-shadow: 0 10px 30px rgba(192, 132, 252, 0.3);
        ">
          <i class="ri-award-line"></i>
        </div>
        <div>
          <h2 style="color: #c084fc; font-size: 28px; font-weight: 700; margin: 0;">${certData.title}</h2>
          ${certData.level ? `<span style="color: #fbbf24; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${certData.level} Level</span>` : ''}
        </div>
      </div>
      <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; line-height: 1.6; margin: 0;">${certData.description}</p>
    </div>
    
    <div class="cert-modal-body">
      <!-- Certificate Details Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
        ${certData.institution ? `
          <div style="background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="color: #c084fc; font-size: 18px; margin-bottom: 8px;"><i class="ri-school-line"></i></div>
            <div style="color: white; font-weight: 600; margin-bottom: 4px;">Institution</div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">${certData.institution}</div>
          </div>
        ` : ''}
        
        ${certData.platform ? `
          <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="color: #3b82f6; font-size: 18px; margin-bottom: 8px;"><i class="ri-global-line"></i></div>
            <div style="color: white; font-weight: 600; margin-bottom: 4px;">Platform</div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">${certData.platform}</div>
          </div>
        ` : ''}
        
        ${certData.date ? `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="color: #10b981; font-size: 18px; margin-bottom: 8px;"><i class="ri-calendar-line"></i></div>
            <div style="color: white; font-weight: 600; margin-bottom: 4px;">Year</div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">${certData.date}</div>
          </div>
        ` : ''}
        
        ${certData.category ? `
          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="color: #f59e0b; font-size: 18px; margin-bottom: 8px;"><i class="ri-folder-line"></i></div>
            <div style="color: white; font-weight: 600; margin-bottom: 4px;">Category</div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: capitalize;">${certData.category}</div>
          </div>
        ` : ''}
      </div>
      
      ${certData.image ? `
        <div style="margin-bottom: 25px; text-align: center;">
          <img src="${certData.image}" alt="${certData.title}" style="max-width: 100%; max-height: 400px; border-radius: 15px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); border: 2px solid rgba(192, 132, 252, 0.2);">
        </div>
      ` : ''}
      
      <div class="cert-modal-actions" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        ${certData.pdf ? `
          <button class="cert-download-btn" style="
            background: linear-gradient(135deg, #c084fc, #6d28d9);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(192, 132, 252, 0.3);
          ">
            <i class="ri-download-2-line"></i>
            Download Certificate
          </button>
        ` : ''}
        
        ${certData.verify ? `
          <button class="cert-verify-btn" style="
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          ">
            <i class="ri-external-link-line"></i>
            Verify Certificate
          </button>
        ` : ''}
        
        <button class="cert-close-btn" style="
          background: rgba(192, 132, 252, 0.1);
          color: #c084fc;
          border: 1px solid rgba(192, 132, 252, 0.3);
          padding: 15px 30px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
        ">
          <i class="ri-close-line"></i>
          Close
        </button>
      </div>
    </div>
  `;

  // Add close button to modal content
  modalContent.appendChild(closeBtn);

  // Add modal to overlay
  modalOverlay.appendChild(modalContent);

  // Add to document
  document.body.appendChild(modalOverlay);

  // Animate in
  setTimeout(() => {
    modalOverlay.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  }, 10);

  // Close modal function
  function closeModal() {
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8)';
    setTimeout(() => {
      if (modalOverlay.parentNode) {
        modalOverlay.parentNode.removeChild(modalOverlay);
      }
    }, 300);
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Download button functionality
  const downloadBtn = modalContent.querySelector('.cert-download-btn');
  if (downloadBtn && certData.pdf) {
    console.log('Setting up modal download button');
    downloadBtn.addEventListener('click', () => {
      console.log('Modal download button clicked');
      const link = document.createElement('a');
      link.href = certData.pdf;
      link.download = `${certData.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      link.target = '_blank';
      
      console.log('Modal download link:', link.href);
      console.log('Modal download filename:', link.download);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Modal download triggered successfully');
      
      // Show success message
      showDownloadSuccess(certData.title);
      
      // Close modal after download
      setTimeout(() => {
        closeModal();
      }, 1000);
    });
  } else {
    console.log('No modal download button found or no PDF data');
  }
  
  // Verify button functionality
  const verifyBtn = modalContent.querySelector('.cert-verify-btn');
  if (verifyBtn && certData.verify) {
    console.log('Setting up modal verify button');
    verifyBtn.addEventListener('click', () => {
      console.log('Modal verify button clicked');
      console.log('Opening verification URL:', certData.verify);
      // Open verification link in new tab
      window.open(certData.verify, '_blank', 'noopener,noreferrer');
      
      console.log('Verification page opened');
      
      // Show success message
      showVerifySuccess(certData.title);
    });
  } else {
    console.log('No modal verify button found or no verify data');
  }

  // Close button functionality
  const modalCloseBtn = modalContent.querySelector('.cert-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Keyboard support
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyPress);
    }
  };
  document.addEventListener('keydown', handleKeyPress);

  // Add hover effects
  const actionButtons = modalContent.querySelectorAll('.cert-download-btn, .cert-verify-btn, .cert-close-btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.05)';
      if (btn.classList.contains('cert-download-btn')) {
        btn.style.boxShadow = '0 10px 25px rgba(192, 132, 252, 0.3)';
      } else if (btn.classList.contains('cert-verify-btn')) {
        btn.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
      } else {
        btn.style.boxShadow = '0 10px 25px rgba(192, 132, 252, 0.3)';
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = 'none';
    });
  });
}

// Starfield background (lightweight)
(function starfield(){
  const canvas = document.getElementById('bg-stars');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  function resize(){
    w = canvas.clientWidth = canvas.offsetWidth;
    h = canvas.clientHeight = canvas.offsetHeight;
    canvas.width = w * DPR; canvas.height = h * DPR; ctx.scale(DPR, DPR);
    stars = new Array(140).fill(0).map(()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6+0.2,
      a: Math.random()*0.6+0.2,
      v: Math.random()*0.2+0.05
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      ctx.fillStyle = `rgba(192,132,252,${s.a})`;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      s.y += s.v; if(s.y>h){ s.y = -2; s.x = Math.random()*w; }
    }
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', resize);
})();

// Three.js floating gem in hero
(function hero3D(){
  const canvas = document.getElementById('hero-3d');
  if(!canvas || !window.THREE) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
  camera.position.z = 3.6;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1));
  function size(){
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  size();

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6); scene.add(ambient);
  const key = new THREE.PointLight(0xc084fc, 1.1); key.position.set(2,2,3); scene.add(key);
  const rim = new THREE.PointLight(0x6d28d9, 1.0); rim.position.set(-3,-1,-2); scene.add(rim);

  // Geometry (icosahedron as low‑poly gem)
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const mat = new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.25, metalness:0.6, envMapIntensity:1,
    emissive: 0x8b5cf6, emissiveIntensity: 0.08 });
  const mesh = new THREE.Mesh(geo, mat); scene.add(mesh);

  // Subtle particles
  const pgeo = new THREE.BufferGeometry();
  const count = 120;
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    positions[i*3+0] = (Math.random()-0.5)*6;
    positions[i*3+1] = (Math.random()-0.5)*6;
    positions[i*3+2] = (Math.random()-0.5)*6;
  }
  pgeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const pmat = new THREE.PointsMaterial({ color:0xc084fc, size:0.02, transparent:true, opacity:0.7 });
  const points = new THREE.Points(pgeo, pmat); scene.add(points);

  // Mouse parallax
  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    targetX = x; targetY = y;
  });

  function animate(){
    mesh.rotation.x += 0.004; mesh.rotation.y += 0.006;
    mesh.rotation.x += (targetY*0.5 - mesh.rotation.x)*0.02;
    mesh.rotation.y += (targetX*0.5 - mesh.rotation.y)*0.02;
    points.rotation.y += 0.0015;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', size);
})();

// Enhanced 3D Tilt effect for cards
document.querySelectorAll('[data-tilt]').forEach((el)=>{
  const strength = 15;
  const glowStrength = 20;
  
  el.addEventListener('mousemove', (e)=>{
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    
    // Enhanced 3D transform with depth
    el.style.transform = `perspective(1000px) rotateX(${(-py*strength)}deg) rotateY(${(px*strength)}deg) translateZ(${Math.abs(px*py*10)}px)`;
    
    // Add glow effect
    const glowX = (px + 0.5) * 100;
    const glowY = (py + 0.5) * 100;
    el.style.boxShadow = `
      ${px*glowStrength}px ${py*glowStrength}px 30px rgba(192, 132, 252, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `;
  });
  
  el.addEventListener('mouseleave', ()=>{
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    el.style.boxShadow = '';
  });
});

// 3D Floating animation for hero elements
function addFloating3D() {
  const heroElements = document.querySelectorAll('.photo-3d, .float-3d');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
    el.classList.add('float-3d');
  });
}

// Initialize 3D effects and enhanced animations (moved to main DOMContentLoaded)

// Enhanced Hero Animations
function initHeroAnimations() {
  // Staggered animation for hero elements
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
  
  // Enhanced button hover effects
  const buttons = document.querySelectorAll('.btn-animated');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Social icons wave animation
  const socialIcons = document.querySelectorAll('.social-animated');
  socialIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(192, 132, 252, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      icon.style.position = 'relative';
      icon.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Enhanced Parallax Effects
function initParallaxEffects() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes, .particles-container');
    
    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Mouse parallax for background
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const bgPattern = document.querySelector('.bg-3d-pattern');
      if (bgPattern) {
        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 30;
        bgPattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      
      // Photo frame mouse interaction
      const photoFrame = document.querySelector('.photo-frame');
      if (photoFrame) {
        const rotateX = (mouseY - 0.5) * 10;
        const rotateY = (mouseX - 0.5) * 10;
        photoFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.card-3d, .section-title, .glass');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-in {
    animation: slideInFromBottom 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);

// Advanced Button Animations and Interactions

// Confetti Burst Effect for Download CV Button
function createConfettiBurst(button) {
  const confettiContainer = button.querySelector('.confetti-container');
  if (!confettiContainer) return;
  
  // Clear any existing confetti
  confettiContainer.innerHTML = '';
  
  // Create confetti pieces
  const colors = ['#c084fc', '#6d28d9', '#a21caf', '#fbbf24', '#10b981', '#3b82f6'];
  const confettiCount = 20;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 4; // 4-10px
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 0.5; // 0-0.5s delay
    const duration = Math.random() * 0.5 + 0.8; // 0.8-1.3s duration
    
    confetti.style.cssText = `
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, (delay + duration) * 1000);
  }
}

// Enhanced Button Hover Effects
function initAdvancedButtonAnimations() {
  // My Projects Button - Card Flip with Enhanced Effects
  const projectsBtn = document.querySelector('.btn-projects');
  if (projectsBtn) {
    projectsBtn.addEventListener('mouseenter', () => {
      // Add extra glow effect
      projectsBtn.style.boxShadow = '0 25px 50px rgba(109, 40, 217, 0.5), 0 0 0 1px rgba(192, 132, 252, 0.3)';
      
      // Trigger icon reveal with delay
      setTimeout(() => {
        const iconReveal = projectsBtn.querySelector('.btn-icon-reveal');
        if (iconReveal) {
          iconReveal.style.transform = 'translateY(-50%) scale(1.1)';
        }
      }, 200);
    });
    
    projectsBtn.addEventListener('mouseleave', () => {
      projectsBtn.style.boxShadow = '0 8px 32px rgba(109, 40, 217, 0.3)';
      
      const iconReveal = projectsBtn.querySelector('.btn-icon-reveal');
      if (iconReveal) {
        iconReveal.style.transform = 'translateY(-50%) scale(1)';
      }
    });
    
    // Add click effect
    projectsBtn.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      projectsBtn.style.position = 'relative';
      projectsBtn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
  
  // Download CV Button - Paper Drop and Confetti
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('mouseenter', () => {
      // Enhanced paper drop with shake
      const paperDrop = downloadBtn.querySelector('.paper-drop');
      if (paperDrop) {
        paperDrop.style.animation = 'paperShake 0.5s ease-in-out, paperFloat 2s ease-in-out infinite 0.5s';
      }
      
      // Arrow bounce enhancement
      const arrowBounce = downloadBtn.querySelector('.arrow-bounce');
      if (arrowBounce) {
        arrowBounce.style.animation = 'arrowBounce 1.5s ease-in-out infinite';
      }
    });
    
    downloadBtn.addEventListener('mouseleave', () => {
      const paperDrop = downloadBtn.querySelector('.paper-drop');
      if (paperDrop) {
        paperDrop.style.animation = '';
      }
      
      const arrowBounce = downloadBtn.querySelector('.arrow-bounce');
      if (arrowBounce) {
        arrowBounce.style.animation = '';
      }
    });
    
    // Confetti burst on click
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create confetti burst
      createConfettiBurst(downloadBtn);
      
      // Add button shake effect
      downloadBtn.style.animation = 'buttonShake 0.5s ease-in-out';
      
      // Reset animation
      setTimeout(() => {
        downloadBtn.style.animation = '';
      }, 500);
      
      // Actually download the file after a short delay
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadBtn.href;
        link.download = downloadBtn.download;
        link.click();
      }, 300);
    });
  }
}

// Enhanced Icon Animations
function initIconAnimations() {
  const iconContainers = document.querySelectorAll('.btn-icon-container');
  
  iconContainers.forEach(container => {
    const icon = container.querySelector('.btn-icon');
    if (!icon) return;
    
    container.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.3) rotate(10deg)';
      icon.style.color = '#c084fc';
      icon.style.filter = 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.5))';
    });
    
    container.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.color = '';
      icon.style.filter = '';
    });
  });
}

// Button Performance Optimization
function optimizeButtonPerformance() {
  const buttons = document.querySelectorAll('.btn-projects, .btn-download');
  
  buttons.forEach(button => {
    // Use transform3d for hardware acceleration
    button.style.willChange = 'transform, box-shadow';
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      button.style.transition = 'none';
      button.style.animation = 'none';
    }
  });
}

// Magnetic Navigation Effect
function initMagneticNavigation() {
  const navLinks = document.querySelectorAll('.nav-link.magnetic');
  
  navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic effect - move element slightly towards cursor
      const moveX = x * 0.1;
      const moveY = y * 0.1;
      
      link.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      
      // Animate particles
      const particles = link.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const delay = index * 0.1;
        setTimeout(() => {
          particle.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.2)`;
          particle.style.opacity = '0.8';
        }, delay * 100);
      });
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translate(0px, 0px) scale(1)';
      
      // Reset particles
      const particles = link.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.transform = 'translate(0px, 0px) scale(1)';
        particle.style.opacity = '0.3';
      });
    });
  });
}

// Enhanced Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const formMessage = document.getElementById('formMessage');
  
  // Show loading state with enhanced animations
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Add loading animation to form inputs
  const inputs = form.querySelectorAll('.contact-form-input-modern');
  inputs.forEach(input => {
    input.style.opacity = '0.7';
    input.disabled = true;
  });
  
  try {
    async function postContact(body){
      const tryPaths = ['/api/contact', '/.netlify/functions/api/contact'];
      let lastErr;
      for (const path of tryPaths) {
        try {
          const resp = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          // Attempt to parse safely
          const text = await resp.text();
          let data; try { data = JSON.parse(text); } catch { data = { success: resp.ok, error: text }; }
          if (resp.ok || (data && (data.success === true))) return data;
          lastErr = data && (data.error || `HTTP ${resp.status}`);
        } catch (e) { lastErr = e && e.message || 'Network error'; }
      }
      throw new Error(lastErr || 'Request failed');
    }

    const result = await postContact({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    });
    
    if (result.success) {
      // Success message with enhanced styling
      formMessage.className = 'contact-form-message-modern';
      formMessage.style.cssText = `
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.3);
        backdrop-filter: blur(10px);
      `;
      formMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="ri-check-line" style="font-size: 1.2rem;"></i>
          <span>${result.message}</span>
        </div>
      `;
      formMessage.classList.remove('hidden');
      
      // Add success animation
      formMessage.style.animation = 'contactMessageSlideIn 0.5s ease-out';
      
      // Reset form with animation
      setTimeout(() => {
        inputs.forEach(input => {
          input.style.transition = 'all 0.3s ease';
          input.style.transform = 'scale(0.95)';
          input.value = '';
          setTimeout(() => {
            input.style.transform = 'scale(1)';
          }, 150);
        });
      }, 500);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.animation = 'contactMessageSlideOut 0.3s ease-in';
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 300);
      }, 5000);
    } else {
      // Error message with enhanced styling
      formMessage.className = 'contact-form-message-modern';
      formMessage.style.cssText = `
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
        backdrop-filter: blur(10px);
      `;
      formMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="ri-error-warning-line" style="font-size: 1.2rem;"></i>
          <span>${result.error || 'Something went wrong. Please try again.'}</span>
        </div>
      `;
      formMessage.classList.remove('hidden');
      formMessage.style.animation = 'contactMessageSlideIn 0.5s ease-out';
    }
  } catch (error) {
    console.error('Form submission error:', error);
    formMessage.className = 'contact-form-message-modern';
    formMessage.style.cssText = `
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      backdrop-filter: blur(10px);
    `;
    formMessage.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="ri-wifi-off-line" style="font-size: 1.2rem;"></i>
        <span>Network error. Please check your connection and try again.</span>
      </div>
    `;
    formMessage.classList.remove('hidden');
    formMessage.style.animation = 'contactMessageSlideIn 0.5s ease-out';
  } finally {
    // Reset button state with animation
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Reset form inputs
      inputs.forEach(input => {
        input.style.opacity = '1';
        input.disabled = false;
      });
    }, 1000);
  }
});

// Enhanced Contact Method Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact method interactions
  initContactMethodInteractions();
  
  // Initialize contact form animations
  initContactFormAnimations();
  
  // Initialize contact section entrance animations
  initContactSectionAnimations();
});

// Contact Method Interactions
function initContactMethodInteractions() {
  const contactMethods = document.querySelectorAll('.contact-method-modern');
  
  contactMethods.forEach(method => {
    const contactType = method.getAttribute('data-contact');
    
    method.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add click animation
      method.style.transform = 'translateX(15px) scale(1.02)';
      setTimeout(() => {
        method.style.transform = 'translateX(10px) scale(1)';
      }, 150);
      
      // Handle different contact types
      switch (contactType) {
        case 'email':
          handleEmailClick(method);
          break;
        case 'phone':
          handlePhoneClick(method);
          break;
        case 'linkedin':
          handleLinkedInClick(method);
          break;
        case 'location':
          handleLocationClick(method);
          break;
      }
    });
    
    // Enhanced hover effects
    method.addEventListener('mouseenter', () => {
      const icon = method.querySelector('.contact-method-icon-modern');
      const glow = method.querySelector('.contact-method-icon-glow');
      
      if (icon && glow) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        glow.style.opacity = '1';
        glow.style.transform = 'scale(1.3)';
      }
    });
    
    method.addEventListener('mouseleave', () => {
      const icon = method.querySelector('.contact-method-icon-modern');
      const glow = method.querySelector('.contact-method-icon-glow');
      
      if (icon && glow) {
        icon.style.transform = 'scale(1) rotate(0deg)';
        glow.style.opacity = '0';
        glow.style.transform = 'scale(1)';
      }
    });
  });
}

// Handle Email Click
function handleEmailClick(method) {
  const email = 'dinoja21.dr@gmail.com';
  
  // Copy to clipboard
  navigator.clipboard.writeText(email).then(() => {
    showContactToast('Email copied to clipboard! 📧', 'success');
  }).catch(() => {
    // Fallback - open email client
    window.location.href = `mailto:${email}`;
  });
}

// Handle Phone Click
function handlePhoneClick(method) {
  const phone = '+94751601034';
  
  // Copy to clipboard
  navigator.clipboard.writeText(phone).then(() => {
    showContactToast('Phone number copied to clipboard! 📞', 'success');
  }).catch(() => {
    // Fallback - open phone app
    window.location.href = `tel:${phone}`;
  });
}

// Handle LinkedIn Click
function handleLinkedInClick(method) {
  const linkedinUrl = 'https://www.linkedin.com/in/dinoja-jeyamalanews';
  window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  showContactToast('Opening LinkedIn profile... 🔗', 'info');
}

// Handle Location Click
function handleLocationClick(method) {
  const location = 'Jaffna, Sri Lanka';
  
  // Copy to clipboard
  navigator.clipboard.writeText(location).then(() => {
    showContactToast('Location copied to clipboard! 📍', 'success');
  }).catch(() => {
    // Fallback - open maps
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  });
}

// Contact Form Animations
function initContactFormAnimations() {
  const formInputs = document.querySelectorAll('.contact-form-input-modern');
  
  formInputs.forEach(input => {
    // Focus animations
    input.addEventListener('focus', () => {
      const container = input.closest('.contact-form-input-container-modern');
      const glow = container.querySelector('.contact-form-input-glow');
      const border = container.querySelector('.contact-form-input-border');
      
      if (glow) glow.style.opacity = '1';
      if (border) border.style.opacity = '1';
      
      // Add floating label effect
      const label = input.closest('.contact-form-group-modern').querySelector('.contact-form-label-modern');
      if (label) {
        label.style.color = '#c084fc';
        label.style.transform = 'translateY(-2px)';
      }
    });
    
    input.addEventListener('blur', () => {
      const container = input.closest('.contact-form-input-container-modern');
      const glow = container.querySelector('.contact-form-input-glow');
      const border = container.querySelector('.contact-form-input-border');
      
      if (glow) glow.style.opacity = '0';
      if (border) border.style.opacity = '0';
      
      // Reset label
      const label = input.closest('.contact-form-group-modern').querySelector('.contact-form-label-modern');
      if (label) {
        label.style.color = 'rgba(255, 255, 255, 0.9)';
        label.style.transform = 'translateY(0)';
      }
    });
    
    // Input validation animations
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.style.borderColor = 'rgba(16, 185, 129, 0.5)';
      } else {
        input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      }
    });
  });
}

// Contact Section Entrance Animations
function initContactSectionAnimations() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerContactSectionAnimations();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(contactSection);
}

// Trigger Contact Section Animations
function triggerContactSectionAnimations() {
  // Animate header elements
  const headerElements = document.querySelectorAll('.contact-header-modern > *');
  headerElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
  
  // Animate layout cards
  setTimeout(() => {
    const layoutCards = document.querySelectorAll('.contact-info-modern, .contact-form-modern');
    layoutCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.95)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 300);
    });
  }, 600);
  
  // Animate contact methods
  setTimeout(() => {
    const contactMethods = document.querySelectorAll('.contact-method-modern');
    contactMethods.forEach((method, index) => {
      method.style.opacity = '0';
      method.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        method.style.transition = 'all 0.5s ease';
        method.style.opacity = '1';
        method.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }, 1200);
  
  // Animate stats
  setTimeout(() => {
    const stats = document.querySelectorAll('.contact-stat-modern');
    stats.forEach((stat, index) => {
      stat.style.opacity = '0';
      stat.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        stat.style.transition = 'all 0.5s ease';
        stat.style.opacity = '1';
        stat.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }, 1800);
}

// Enhanced Toast Notifications
function showContactToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `contact-toast contact-toast-${type}`;
  
  const colors = {
    success: { bg: 'rgba(16, 185, 129, 0.9)', border: 'rgba(16, 185, 129, 0.3)' },
    error: { bg: 'rgba(239, 68, 68, 0.9)', border: 'rgba(239, 68, 68, 0.3)' },
    info: { bg: 'rgba(59, 130, 246, 0.9)', border: 'rgba(59, 130, 246, 0.3)' }
  };
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type].bg};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10001;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border: 1px solid ${colors[type].border};
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
  `;
  
  toast.innerHTML = `
    <div style="font-size: 18px;">${getToastIcon(type)}</div>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Get Toast Icon
function getToastIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };
  return icons[type] || 'ℹ️';
}

// Add CSS for contact animations
const contactStyle = document.createElement('style');
contactStyle.textContent = `
  @keyframes contactMessageSlideIn {
    0% { 
      transform: translateY(-20px);
      opacity: 0;
    }
    100% { 
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes contactMessageSlideOut {
    0% { 
      transform: translateY(0);
      opacity: 1;
    }
    100% { 
      transform: translateY(-20px);
      opacity: 0;
    }
  }
  
  .contact-toast {
    animation: contactToastSlideIn 0.3s ease-out;
  }
  
  @keyframes contactToastSlideIn {
    0% { 
      transform: translateX(100%);
      opacity: 0;
    }
    100% { 
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(contactStyle);

// Enhanced Navbar Animations
function initNavbarAnimations() {
  const navLinks = document.querySelectorAll('.nav-link.magnetic');
  
  navLinks.forEach(link => {
    // Magnetic hover effect
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) * 0.1;
      const deltaY = (mouseY - centerY) * 0.1;
      
      // Apply magnetic effect with smooth transition
      link.style.transform = `translate(${deltaX}px, ${deltaY}px) translateZ(5px) scale(1.05)`;
    });
    
    link.addEventListener('mouseleave', () => {
      // Reset position with smooth transition
      link.style.transform = 'translate(0px, 0px) translateZ(0px) scale(1)';
    });
    
    // Enhanced hover effects with particle animation
    link.addEventListener('mouseenter', () => {
      // Add subtle shake effect
      link.style.animation = 'navLinkShake 0.3s ease-in-out';
      
      // Trigger particle burst
      const particles = link.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        particle.style.animation = 'none';
        setTimeout(() => {
          particle.style.animation = `navParticleFloat ${2.5 + Math.random() * 1}s ease-in-out infinite`;
        }, index * 50);
      });
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.animation = '';
    });
    
    // Click effect with ripple
    link.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(192, 132, 252, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 60px;
        height: 60px;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
        z-index: 10;
      `;
      
      link.style.position = 'relative';
      link.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add CSS for navbar shake animation
  const style = document.createElement('style');
  style.textContent += `
    @keyframes navLinkShake {
      0%, 100% { transform: translate(0px, 0px) translateZ(5px) scale(1.05); }
      25% { transform: translate(-1px, 1px) translateZ(5px) scale(1.05); }
      50% { transform: translate(1px, -1px) translateZ(5px) scale(1.05); }
      75% { transform: translate(-1px, -1px) translateZ(5px) scale(1.05); }
    }
  `;
  document.head.appendChild(style);
}

// Enhanced mobile menu animations
function initMobileMenuAnimations() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      if (!mobileMenu.classList.contains('hidden')) {
        // Animate menu items in
        const menuItems = mobileMenu.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-20px)';
          
          setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }
    });
  }
}

// Initialize mobile menu animations (moved to main DOMContentLoaded)

// ===== CONTACT ICON ANIMATIONS =====

// Track clicked contact icons
let clickedIcons = new Set();
const totalContactIcons = 3; // LinkedIn, Email, Phone

// Initialize contact icon animations
function initContactIconAnimations() {
  const contactIcons = document.querySelectorAll('.contact-icon');
  
  contactIcons.forEach(icon => {
    const contactType = icon.getAttribute('data-contact');
    
    // Add click event listener
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Prevent multiple animations on the same icon
      if (icon.classList.contains('animating')) return;
      
      icon.classList.add('animating');
      
      // Track this icon as clicked
      clickedIcons.add(contactType);
      
      // Trigger specific animation based on contact type
      switch (contactType) {
        case 'linkedin':
          triggerLinkedInAnimation(icon);
          break;
        case 'email':
          triggerEmailAnimation(icon);
          break;
        case 'phone':
          triggerPhoneAnimation(icon);
          break;
      }
      
      // Check if all icons have been clicked
      setTimeout(() => {
        if (clickedIcons.size === totalContactIcons) {
          showFinalGreeting();
        }
      }, 2000);
      
      // Open the original link after animation delay
      setTimeout(() => {
        const href = icon.getAttribute('href');
        if (href) {
          if (contactType === 'email' || contactType === 'phone') {
            window.location.href = href;
          } else {
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        }
      }, 1500);
      
      // Allow animation again after delay
      setTimeout(() => {
        icon.classList.remove('animating');
      }, 3000);
    });
  });
}

// LinkedIn Animation: 360° rotation + glowing box + shimmer text
function triggerLinkedInAnimation(icon) {
  // Add rotation animation
  icon.classList.add('linkedin-rotate');
  
  // Create glowing box with message
  const glowBox = document.createElement('div');
  glowBox.className = 'linkedin-glow-box';
  glowBox.innerHTML = '<div class="linkedin-text">Let\'s connect on LinkedIn!</div>';
  
  // Position relative to icon
  icon.style.position = 'relative';
  icon.appendChild(glowBox);
  
  // Remove elements after animation
  setTimeout(() => {
    icon.classList.remove('linkedin-rotate');
  }, 1000);
  
  setTimeout(() => {
    if (glowBox.parentNode) {
      glowBox.parentNode.removeChild(glowBox);
    }
  }, 4000);
}

// Email Animation: Scale effect + paper plane + typewriter text
function triggerEmailAnimation(icon) {
  // Add scale animation
  icon.classList.add('email-scale');
  
  // Create paper plane
  const paperPlane = document.createElement('div');
  paperPlane.className = 'paper-plane';
  paperPlane.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 2L3 10l7 2 11-8z"/>
      <path d="M3 10l18 8-7 2z"/>
    </svg>
  `;
  
  // Create message box
  const messageBox = document.createElement('div');
  messageBox.className = 'email-message';
  messageBox.innerHTML = '<div class="email-text">Shoot me an email anytime 📬</div>';
  
  // Position relative to icon
  icon.style.position = 'relative';
  icon.appendChild(paperPlane);
  icon.appendChild(messageBox);
  
  // Remove elements after animation
  setTimeout(() => {
    icon.classList.remove('email-scale');
  }, 600);
  
  setTimeout(() => {
    if (paperPlane.parentNode) {
      paperPlane.parentNode.removeChild(paperPlane);
    }
    if (messageBox.parentNode) {
      messageBox.parentNode.removeChild(messageBox);
    }
  }, 4000);
}

// Phone Animation: Shake effect + wave animation + blinking text
function triggerPhoneAnimation(icon) {
  // Add shake animation
  icon.classList.add('phone-shake');
  
  // Create wave animation
  const wave = document.createElement('div');
  wave.className = 'phone-wave';
  
  // Create message box
  const messageBox = document.createElement('div');
  messageBox.className = 'phone-message';
  messageBox.innerHTML = '<div class="phone-text">Call me maybe? 📞😉</div>';
  
  // Position relative to icon
  icon.style.position = 'relative';
  icon.appendChild(wave);
  icon.appendChild(messageBox);
  
  // Remove elements after animation
  setTimeout(() => {
    icon.classList.remove('phone-shake');
  }, 800);
  
  setTimeout(() => {
    if (wave.parentNode) {
      wave.parentNode.removeChild(wave);
    }
    if (messageBox.parentNode) {
      messageBox.parentNode.removeChild(messageBox);
    }
  }, 4000);
}

// Show final greeting when all icons have been clicked
function showFinalGreeting() {
  // Create final greeting element
  const greeting = document.createElement('div');
  greeting.className = 'final-greeting';
  greeting.innerHTML = '<p class="greeting-text">Thanks for connecting with me!</p>';
  
  // Add to body
  document.body.appendChild(greeting);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (greeting.parentNode) {
      greeting.parentNode.removeChild(greeting);
    }
  }, 5000);
}

// ===== ABOUT SECTION ANIMATIONS =====

// Initialize About Section Animations
function initAboutSectionAnimations() {
  // Set up intersection observer for About section
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerAboutAnimations();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
}

// Trigger About Section Animations
function triggerAboutAnimations() {
  // Animate About Me section
  const aboutMeSection = document.querySelector('.about-me-section');
  if (aboutMeSection) {
    aboutMeSection.classList.add('animate-in');
    
    // Animate keywords with delay
    setTimeout(() => {
      const keywords = aboutMeSection.querySelectorAll('.highlight-keyword');
      keywords.forEach((keyword, index) => {
        setTimeout(() => {
          keyword.classList.add('animate-in');
        }, index * 200);
      });
    }, 800);
  }

  // Animate Contact section
  setTimeout(() => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.classList.add('animate-in');
    }
  }, 200);

  // Animate Tech Focus section
  setTimeout(() => {
    const techSection = document.querySelector('.tech-focus-section');
    if (techSection) {
      techSection.classList.add('animate-in');
    }
  }, 400);

  // Animate Soft Skills section
  setTimeout(() => {
    const softSkillsSection = document.querySelector('.soft-skills-section');
    if (softSkillsSection) {
      softSkillsSection.classList.add('animate-in');
    }
  }, 600);

  // Animate CTA section
  setTimeout(() => {
    const ctaSection = document.querySelector('.about-cta');
    if (ctaSection) {
      ctaSection.classList.add('animate-in');
    }
  }, 1200);
}

// Smooth Scroll to About Section
function initSmoothScrollToAbout() {
  const aboutLinks = document.querySelectorAll('a[href="#about"]');
  
  aboutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // Smooth scroll with offset for navbar
        const navbarHeight = document.querySelector('header').offsetHeight;
        const targetPosition = aboutSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Add pulse effect to About title when scrolled to
        setTimeout(() => {
          const aboutTitle = document.querySelector('.about-title');
          if (aboutTitle) {
            aboutTitle.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
              aboutTitle.style.animation = '';
            }, 600);
          }
        }, 800);
      }
    });
  });
}

// Enhanced Tech Item Interactions
function initTechItemInteractions() {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'tech-tooltip';
      tooltip.textContent = getTechDescription(item.textContent);
      
      // Position tooltip
      const rect = item.getBoundingClientRect();
      tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top - 40}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: #c084fc;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        border: 1px solid rgba(192, 132, 252, 0.3);
        backdrop-filter: blur(10px);
        animation: tooltipFadeIn 0.3s ease-out;
      `;
      
      document.body.appendChild(tooltip);
      
      // Remove tooltip on mouse leave
      item.addEventListener('mouseleave', () => {
        if (tooltip.parentNode) {
          tooltip.style.animation = 'tooltipFadeOut 0.3s ease-out';
          setTimeout(() => {
            if (tooltip.parentNode) {
              tooltip.parentNode.removeChild(tooltip);
            }
          }, 300);
        }
      }, { once: true });
    });
  });
}

// Get tech description for tooltips
function getTechDescription(tech) {
  const descriptions = {
    'JavaScript': 'Dynamic programming language for web development',
    'TypeScript': 'Typed superset of JavaScript with enhanced tooling',
    'Python': 'Versatile programming language for various applications',
    'React': 'Popular JavaScript library for building user interfaces',
    'Angular': 'Comprehensive framework for web applications',
    'Node.js': 'JavaScript runtime for server-side development',
    'Django': 'High-level Python web framework',
    'MySQL': 'Relational database management system',
    'MongoDB': 'NoSQL document-oriented database',
    'Git': 'Distributed version control system',
    'GitHub': 'Web-based Git repository hosting service',
    'VS Code': 'Popular code editor with extensive extensions',
    'Postman': 'API development and testing platform'
  };
  
  return descriptions[tech] || 'Technology and tool';
}

// Initialize tech interactions when About section is visible
function initTechInteractions() {
  const techSection = document.querySelector('.tech-focus-section');
  if (techSection && techSection.classList.contains('animate-in')) {
    initTechItemInteractions();
  }
}

// Add CSS for tooltip animations
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  @keyframes tooltipFadeIn {
    0% { opacity: 0; transform: translateX(-50%) translateY(5px); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  
  @keyframes tooltipFadeOut {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(5px); }
  }
`;
document.head.appendChild(tooltipStyle);

// Enhanced Contact Item Interactions
function initContactInteractions() {
  const contactEmail = document.querySelector('.contact-email');
  const contactPhone = document.querySelector('.contact-phone');
  
  if (contactEmail) {
    contactEmail.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Copy email to clipboard
      navigator.clipboard.writeText('dinoja21.dr@gmail.com').then(() => {
        showToast('Email copied to clipboard! 📧', 'success');
      }).catch(() => {
        // Fallback for older browsers
        window.location.href = 'mailto:dinoja21.dr@gmail.com';
      });
    });
  }
  
  if (contactPhone) {
    contactPhone.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Copy phone to clipboard
      navigator.clipboard.writeText('+94 751601034').then(() => {
        showToast('Phone number copied to clipboard! 📞', 'success');
      }).catch(() => {
        // Fallback for older browsers
        window.location.href = 'tel:+94751601034';
      });
    });
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 2000;
    backdrop-filter: blur(10px);
    border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
    animation: toastSlideIn 0.3s ease-out;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.3s ease-in';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Add CSS for toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes toastSlideIn {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes toastSlideOut {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(toastStyle);

// Initialize contact interactions when About section is visible
function initContactItemInteractions() {
  const contactSection = document.querySelector('.contact-section');
  if (contactSection && contactSection.classList.contains('animate-in')) {
    initContactInteractions();
  }
}

// Enhanced About Section Scroll Effects
function initAboutScrollEffects() {
  let ticking = false;
  
  function updateAboutEffects() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const rect = aboutSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      // Update particle positions based on scroll
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      const particles = document.querySelectorAll('.about-particle');
      particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrollProgress * speed * 50}px)`;
      });
      
      // Update floating icons
      const icons = document.querySelectorAll('.floating-icon');
      icons.forEach((icon, index) => {
        const speed = 0.3 + (index * 0.05);
        icon.style.transform = `translateY(${scrollProgress * speed * 30}px) rotate(${scrollProgress * 10}deg)`;
      });
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateAboutEffects);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Initialize all About section features (moved to main DOMContentLoaded)

// ===== GSAP ABOUT SECTION ANIMATIONS =====

// Initialize GSAP About Section Animations
function initGSAPAboutAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Skipping GSAP animations.');
    return;
  }
  
  // Set initial states for GSAP animations
  gsap.set('.about-me-section', { opacity: 0, y: 50, scale: 0.95 });
  gsap.set('.contact-section', { opacity: 0, y: 50, scale: 0.95 });
  gsap.set('.tech-focus-section', { opacity: 0, y: 50, scale: 0.95 });
  gsap.set('.soft-skills-section', { opacity: 0, y: 50, scale: 0.95 });
  gsap.set('.about-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.contact-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.tech-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.soft-skills-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.bg-particle', { opacity: 0, scale: 0 });
  gsap.set('.highlight-keyword', { opacity: 0, y: 20 });
  gsap.set('.tech-item', { opacity: 0, scale: 0 });
  gsap.set('.soft-skill-item', { opacity: 0, x: 20 });
  gsap.set('.contact-item', { opacity: 0, x: -20 });
  
  // Create intersection observer for About section
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerGSAPAboutAnimations();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
}

// Trigger GSAP About Animations
function triggerGSAPAboutAnimations() {
  // Create master timeline
  const tl = gsap.timeline({ delay: 0.2 });
  
  // Background particle effect
  tl.to('.bg-particle', {
    opacity: 0.6,
    scale: 1,
    duration: 1,
    stagger: 0.1,
    ease: "back.out(1.7)"
  });
  
  // About Me section animation
  tl.to('.about-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.5")
  .to('.about-me-section', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.3")
  .to('.highlight-keyword', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.5");
  
  // Contact section animation
  tl.to('.contact-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .to('.contact-section', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.3")
  .to('.contact-item', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.5");
  
  // Tech Focus section animation
  tl.to('.tech-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .to('.tech-focus-section', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.3")
  .to('.tech-item', {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "back.out(1.7)"
  }, "-=0.5");
  
  // Soft Skills section animation
  tl.to('.soft-skills-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .to('.soft-skills-section', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.3")
  .to('.soft-skill-item', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.5");
  
  // CTA animation
  tl.to('.about-cta', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.3");
  
  // Add hover effects for tech items
  tl.call(() => {
    initTechItemHoverEffects();
  });
}

// Enhanced Tech Item Hover Effects
function initTechItemHoverEffects() {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.1,
        y: -2,
        boxShadow: "0 8px 25px rgba(192, 132, 252, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        y: 0,
        boxShadow: "0 0 0 rgba(192, 132, 252, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
  
  // Soft skills hover effects
  const softSkillItems = document.querySelectorAll('.soft-skill-item');
  
  softSkillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 5,
        color: "#c084fc",
        textShadow: "0 0 10px rgba(192, 132, 252, 0.5)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        color: "rgba(255, 255, 255, 0.7)",
        textShadow: "0 0 0 rgba(192, 132, 252, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
  
  // Contact item hover effects
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 5,
        color: "#c084fc",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        color: "rgba(255, 255, 255, 0.7)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

// ===== GSAP SKILLS SECTION ANIMATIONS =====

// Initialize GSAP Skills Section Animations
function initGSAPSkillsAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Skipping GSAP animations.');
    return;
  }
  
  // Set initial states for GSAP animations
  gsap.set('.skills-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.skill-card', { opacity: 0, y: 80, scale: 0.8 });
  gsap.set('.skill-icon', { opacity: 0, scale: 0, rotation: -90 });
  gsap.set('.skill-icon-glow', { opacity: 0, scale: 0 });
  gsap.set('.skill-title', { opacity: 0, y: 20 });
  gsap.set('.skill-description', { opacity: 0, y: 20 });
  gsap.set('.tech-badge', { opacity: 0, scale: 0 });
  gsap.set('.skill-particle', { opacity: 0, scale: 0 });
  
  // Create intersection observer for Skills section
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerGSAPSkillsAnimations();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

// Trigger GSAP Skills Animations
function triggerGSAPSkillsAnimations() {
  // Create master timeline
  const tl = gsap.timeline({ delay: 0.3 });
  
  // Skills section icon animation
  tl.to('.skills-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
  
  // Background particles animation
  tl.to('.skill-particle', {
    opacity: 0.6,
    scale: 1,
    duration: 1,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.5");
  
  // Skill cards animation with stagger
  tl.to('.skill-card', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.3");
  
  // Skill icons animation
  tl.to('.skill-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.5");
  
  // Icon glow animation
  tl.to('.skill-icon-glow', {
    opacity: 0.8,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3");
  
  // Skill titles animation
  tl.to('.skill-title', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.4");
  
  // Skill descriptions animation
  tl.to('.skill-description', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3");
  
  // Tech badges animation
  tl.to('.tech-badge', {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "back.out(1.7)"
  }, "-=0.2");
  
  // Add hover effects
  tl.call(() => {
    initSkillsHoverEffects();
  });
}

// Skill Tabs Functionality
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const skillCategories = document.querySelectorAll('.skill-category-card, .skill-category-modern');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      const category = tab.dataset.category;
      
      // Show/hide skill categories based on selection
      skillCategories.forEach(skillCategory => {
        if (category === 'all' || skillCategory.dataset.category === category) {
          skillCategory.style.display = 'block';
          skillCategory.style.opacity = '0';
          skillCategory.style.transform = 'translateY(20px)';
          
          // Animate in
          setTimeout(() => {
            skillCategory.style.transition = 'all 0.5s ease';
            skillCategory.style.opacity = '1';
            skillCategory.style.transform = 'translateY(0)';
          }, 100);
        } else {
          skillCategory.style.transition = 'all 0.3s ease';
          skillCategory.style.opacity = '0';
          skillCategory.style.transform = 'translateY(-20px)';
          setTimeout(() => {
            skillCategory.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize Circular Progress Rings
function initCircularProgressRings() {
  const progressRings = document.querySelectorAll('.progress-ring-fill');
  
  progressRings.forEach(ring => {
    const level = parseInt(ring.dataset.level);
    const circumference = 2 * Math.PI * 25; // radius = 25
    const offset = circumference - (level / 100) * circumference;
    
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    
    // Animate the progress ring
    setTimeout(() => {
      ring.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
      ring.style.strokeDashoffset = offset;
    }, 500);
  });
}

// Enhanced Skills Hover Effects
function initSkillsHoverEffects() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Card hover animation
      gsap.to(card, {
        y: -10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Icon glow enhancement
      const iconGlow = card.querySelector('.skill-icon-glow');
      gsap.to(iconGlow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Icon rotation
      const icon = card.querySelector('.skill-icon');
      gsap.to(icon, {
        rotation: 360,
        duration: 0.6,
        ease: "power2.out"
      });
      
      // Tech badges bounce
      const badges = card.querySelectorAll('.tech-badge');
      gsap.to(badges, {
        y: -2,
        scale: 1.1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card animation
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset icon glow
      const iconGlow = card.querySelector('.skill-icon-glow');
      gsap.to(iconGlow, {
        opacity: 0.8,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset icon rotation
      const icon = card.querySelector('.skill-icon');
      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset tech badges
      const badges = card.querySelectorAll('.tech-badge');
      gsap.to(badges, {
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      });
    });
  });
  
  // Tech badge individual hover effects
  const techBadges = document.querySelectorAll('.tech-badge');
  
  techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      gsap.to(badge, {
        scale: 1.2,
        y: -3,
        backgroundColor: "rgba(192, 132, 252, 0.3)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        scale: 1,
        y: 0,
        backgroundColor: "rgba(192, 132, 252, 0.1)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });
}

// ===== GSAP PROJECTS SECTION ANIMATIONS =====

// Initialize GSAP Projects Section Animations
function initGSAPProjectsAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Skipping GSAP animations.');
    return;
  }
  
  // Set initial states for GSAP animations
  gsap.set('.projects-section-icon', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('.project-card', { opacity: 0, y: 100, scale: 0.8, rotationY: 15 });
  gsap.set('.project-icon', { opacity: 0, scale: 0, rotation: -90 });
  gsap.set('.project-icon-glow', { opacity: 0, scale: 0 });
  gsap.set('.project-title', { opacity: 0, y: 20 });
  gsap.set('.project-description', { opacity: 0, y: 20 });
  gsap.set('.project-badge', { opacity: 0, scale: 0 });
  gsap.set('.tech-stack-badge', { opacity: 0, scale: 0 });
  gsap.set('.project-link', { opacity: 0, y: 20 });
  gsap.set('.project-particle', { opacity: 0, scale: 0 });
  
  // Create intersection observer for Projects section
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerGSAPProjectsAnimations();
        projectsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsObserver.observe(projectsSection);
  }
}

// Trigger GSAP Projects Animations
function triggerGSAPProjectsAnimations() {
  // Create master timeline
  const tl = gsap.timeline({ delay: 0.3 });
  
  // Projects section icon animation
  tl.to('.projects-section-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
  
  // Background particles animation
  tl.to('.project-particle', {
    opacity: 0.6,
    scale: 1,
    duration: 1,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.5");
  
  // Project cards animation with stagger and flip effect
  tl.to('.project-card', {
    opacity: 1,
    y: 0,
    scale: 1,
    rotationY: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out"
  }, "-=0.3");
  
  // Project icons animation
  tl.to('.project-icon', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.5");
  
  // Icon glow animation
  tl.to('.project-icon-glow', {
    opacity: 0.8,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3");
  
  // Project titles animation
  tl.to('.project-title', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.4");
  
  // Project descriptions animation
  tl.to('.project-description', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3");
  
  // Project badges animation
  tl.to('.project-badge', {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.2");
  
  // Tech stack badges animation
  tl.to('.tech-stack-badge', {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "back.out(1.7)"
  }, "-=0.1");
  
  // Project links animation
  tl.to('.project-link', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.2");
  
  // Add hover effects
  tl.call(() => {
    initProjectsHoverEffects();
  });
}

// Enhanced Projects Hover Effects
function initProjectsHoverEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Card hover animation with flip effect
      gsap.to(card, {
        y: -15,
        scale: 1.05,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Icon glow enhancement
      const iconGlow = card.querySelector('.project-icon-glow');
      gsap.to(iconGlow, {
        opacity: 1,
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Icon rotation
      const icon = card.querySelector('.project-icon');
      gsap.to(icon, {
        rotation: 360,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Tech stack badges slide in
      const badges = card.querySelectorAll('.tech-stack-badge');
      gsap.to(badges, {
        y: -3,
        scale: 1.1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)"
      });
      
      // Project link glow
      const linkGlow = card.querySelector('.project-link-glow');
      gsap.to(linkGlow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // GitHub icon zoom
      const githubIcon = card.querySelector('.project-link i');
      gsap.to(githubIcon, {
        scale: 1.3,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card animation
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Reset icon glow
      const iconGlow = card.querySelector('.project-icon-glow');
      gsap.to(iconGlow, {
        opacity: 0.8,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset icon rotation
      const icon = card.querySelector('.project-icon');
      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset tech badges
      const badges = card.querySelectorAll('.tech-stack-badge');
      gsap.to(badges, {
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      });
      
      // Reset project link glow
      const linkGlow = card.querySelector('.project-link-glow');
      gsap.to(linkGlow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset GitHub icon
      const githubIcon = card.querySelector('.project-link i');
      gsap.to(githubIcon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
  
  // Tech stack badge individual hover effects
  const techStackBadges = document.querySelectorAll('.tech-stack-badge');
  
  techStackBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      gsap.to(badge, {
        scale: 1.2,
        y: -3,
        backgroundColor: "rgba(192, 132, 252, 0.3)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        scale: 1,
        y: 0,
        backgroundColor: "rgba(192, 132, 252, 0.1)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });
  
  // Project link hover effects
  const projectLinks = document.querySelectorAll('.project-link');
  
  projectLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.05,
        y: -2,
        color: "#c084fc",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        y: 0,
        color: "#c084fc",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });
}

// ===== SMOOTH SCROLLING AND SECTION ANIMATIONS =====

// Initialize Smooth Scrolling
function initSmoothScrolling() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Add click effect to the link
        addClickEffect(link);
        
        // Smooth scroll to section
        smoothScrollToSection(targetSection, link);
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// Smooth Scroll to Section with Animation
function smoothScrollToSection(section, clickedLink) {
  const navbar = document.querySelector('header');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const targetPosition = section.offsetTop - navbarHeight - 20;
  
  // Check if GSAP and ScrollToPlugin are available
  if (typeof gsap !== 'undefined' && gsap.ScrollToPlugin) {
    // Use GSAP for smooth scrolling
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      ease: "power2.inOut",
      onComplete: () => {
        // Trigger section entrance animation
        triggerSectionEntrance(section);
        
        // Update active navigation
        updateActiveNavigation(clickedLink);
      }
    });
  } else {
    // Fallback to native smooth scrolling
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Trigger animations after scroll
    setTimeout(() => {
      triggerSectionEntrance(section);
      updateActiveNavigation(clickedLink);
    }, 500);
  }
}

// Add Click Effect to Navigation Links
function addClickEffect(link) {
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'nav-ripple';
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(192, 132, 252, 0.4);
    transform: scale(0);
    animation: navRipple 0.6s linear;
    pointer-events: none;
    width: 60px;
    height: 60px;
    left: 50%;
    top: 50%;
    margin-left: -30px;
    margin-top: -30px;
    z-index: 10;
  `;
  
  link.style.position = 'relative';
  link.appendChild(ripple);
  
  // Add link glow effect
  link.style.boxShadow = '0 0 20px rgba(192, 132, 252, 0.5)';
  link.style.transform = 'scale(1.1)';
  
  setTimeout(() => {
    ripple.remove();
    link.style.boxShadow = '';
    link.style.transform = '';
  }, 600);
}

// Trigger Section Entrance Animation
function triggerSectionEntrance(section) {
  const sectionId = section.id;
  
  // Add entrance animation class
  section.classList.add('section-entering');
  
  // Trigger specific section animations
  switch (sectionId) {
    case 'home':
      triggerHomeEntrance();
      break;
    case 'about':
      triggerAboutEntrance();
      break;
    case 'skills':
      triggerSkillsEntrance();
      break;
    case 'projects':
      triggerProjectsEntrance();
      break;
    case 'certs':
      triggerCertsEntrance();
      break;
    case 'contact':
      triggerContactEntrance();
      break;
  }
  
  // Remove entrance class after animation
  setTimeout(() => {
    section.classList.remove('section-entering');
  }, 2000);
}

// Home Section Entrance Animation
function triggerHomeEntrance() {
  const heroContent = document.querySelector('.hero-content');
  const heroButtons = document.querySelectorAll('.hero-buttons .btn-animated');
  const heroImage = document.querySelector('.photo-frame');
  
  if (heroContent) {
    gsap.fromTo(heroContent, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    );
  }
  
  if (heroButtons.length > 0) {
    gsap.fromTo(heroButtons,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)", delay: 0.3 }
    );
  }
  
  if (heroImage) {
    gsap.fromTo(heroImage,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }
}

// About Section Entrance Animation
function triggerAboutEntrance() {
  const aboutSections = document.querySelectorAll('.about-me-section, .contact-section, .tech-focus-section, .soft-skills-section');
  const aboutIcons = document.querySelectorAll('.about-section-icon, .contact-section-icon, .tech-section-icon, .soft-skills-section-icon');
  
  if (aboutSections.length > 0) {
    gsap.fromTo(aboutSections,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }
  
  if (aboutIcons.length > 0) {
    gsap.fromTo(aboutIcons,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
    );
  }
}

// Skills Section Entrance Animation
function triggerSkillsEntrance() {
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsIcon = document.querySelector('.skills-section-icon');
  
  if (skillsIcon) {
    gsap.fromTo(skillsIcon,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
  }
  
  if (skillCards.length > 0) {
    gsap.fromTo(skillCards,
      { opacity: 0, y: 80, scale: 0.8, rotationY: 15 },
      { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
  }
}

// Projects Section Entrance Animation
function triggerProjectsEntrance() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectsIcon = document.querySelector('.projects-section-icon');
  
  if (projectsIcon) {
    gsap.fromTo(projectsIcon,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
  }
  
  if (projectCards.length > 0) {
    gsap.fromTo(projectCards,
      { opacity: 0, y: 100, scale: 0.8, rotationY: 20 },
      { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.3 }
    );
  }
}

// Certificates Section Entrance Animation
function triggerCertsEntrance() {
  const certCards = document.querySelectorAll('.certificate-card-ultra');
  const certsIcon = document.querySelector('.certificates-section-icon');
  
  if (certsIcon) {
    gsap.fromTo(certsIcon,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
  }
  
  if (certCards.length > 0) {
    gsap.fromTo(certCards,
      { opacity: 0, y: 60, scale: 0.9, rotationX: 15 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );
  }
}

// Contact Section Entrance Animation
function triggerContactEntrance() {
  const contactForm = document.querySelector('.contact-form-elegant');
  const contactInfo = document.querySelector('.contact-info-elegant');
  const contactSocial = document.querySelector('.contact-social-elegant');
  
  if (contactForm) {
    gsap.fromTo(contactForm,
      { opacity: 0, x: -50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }
  
  if (contactInfo) {
    gsap.fromTo(contactInfo,
      { opacity: 0, x: 50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }
  
  if (contactSocial) {
    gsap.fromTo(contactSocial,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );
  }
}

// Update Active Navigation
function updateActiveNavigation(clickedLink) {
  // Remove active class from all nav links
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    link.classList.remove('nav-active');
  });
  
  // Add active class to clicked link
  clickedLink.classList.add('nav-active');
  
  // Add glow effect
  clickedLink.style.boxShadow = '0 0 15px rgba(192, 132, 252, 0.6)';
  
  // Remove glow after animation
  setTimeout(() => {
    clickedLink.style.boxShadow = '';
  }, 2000);
}

// Initialize Section Animations
function initSectionAnimations() {
  // Add CSS for section animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes navRipple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .section-entering {
      animation: sectionPulse 0.5s ease-out;
    }
    
    @keyframes sectionPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    .nav-active {
      color: #c084fc !important;
      text-shadow: 0 0 10px rgba(192, 132, 252, 0.5);
    }
    
    .nav-link {
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      transform: translateY(-2px);
      color: #c084fc;
    }
  `;
  document.head.appendChild(style);
  
  // Add scroll spy functionality
  initScrollSpy();
}

// Initialize Scroll Spy
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Update active navigation
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Enhanced Technical Skills Animations
function initTechnicalSkillsAnimations() {
  // Animate progress bars on scroll
  const skillItems = document.querySelectorAll('.skill-item, .skill-item-modern');
  
  const animateProgressBars = () => {
    skillItems.forEach(item => {
      const progressFill = item.querySelector('.progress-fill, .skill-progress-fill');
      if (progressFill) {
        const level = progressFill.getAttribute('data-level');
        if (level) {
          progressFill.style.setProperty('--progress-width', `${level}%`);
          item.classList.add('animate-progress');
        }
      }
    });
  };

  // Intersection Observer for progress bars
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          animateProgressBars();
        }, 500);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    progressObserver.observe(skillsSection);
  }

  // Enhanced hover effects for skill items
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(192, 132, 252, 0.3);
        transform: scale(0);
        animation: skillRipple 0.6s linear;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        z-index: 1;
      `;
      
      item.style.position = 'relative';
      item.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add click animation
    item.addEventListener('click', () => {
      item.style.animation = 'skillItemClick 0.3s ease-out';
      setTimeout(() => {
        item.style.animation = '';
      }, 300);
    });
  });

  // Animate floating background icons
  const floatingIcons = document.querySelectorAll('.skill-floating-icon');
  floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skillRipple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes skillItemClick {
      0% { transform: scale(1); }
      50% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    
    .skill-item.animate-progress .progress-fill,
    .skill-item-modern.animate-progress .skill-progress-fill {
      width: var(--progress-width) !important;
    }
  `;
  document.head.appendChild(style);
}

// Initialize Technical Skills animations
document.addEventListener('DOMContentLoaded', () => {
  initTechnicalSkillsAnimations();
});

// Public Messages rendering helpers
(function initPublicMessages(){
  const container = document.getElementById('publicMessages');
  const list = document.getElementById('messagesList');
  if (!container || !list) return;

  function createItem({ name, message }) {
    const item = document.createElement('div');
    item.className = 'public-message-item';
    item.style.cssText = 'border:1px solid rgba(192,132,252,0.25); border-radius:12px; padding:12px 14px; background:rgba(30,27,75,0.35); backdrop-filter:blur(8px);';
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; color:#c084fc; font-weight:600;">
        <i class="ri-user-smile-line"></i>
        <span>${name || 'Anonymous'}</span>
      </div>
      <div style="color:rgba(255,255,255,0.85); white-space:pre-wrap;">${(message||'').toString().slice(0,500)}</div>
    `;
    return item;
  }

  function showContainer() {
    container.classList.remove('hidden');
  }

  // Expose for contact form handler
  window.__PublicMessages = {
    append(entry){
      try { list.prepend(createItem(entry)); showContainer(); } catch(_){}
    },
    hydrate(entries){
      try {
        list.innerHTML = '';
        entries.forEach(e=> list.appendChild(createItem(e)));
        if (entries && entries.length) showContainer();
      } catch(_){}
    }
  };

  // Try to fetch existing (will return [] on public deploy)
  fetch('/api/contacts', { method:'GET' })
    .then(r=> r.ok ? r.json() : [])
    .then(rows => {
      // Normalize possible shapes
      const normalized = Array.isArray(rows) ? rows.map(r => ({ name: r.name||'User', message: r.message||'' })) : [];
      window.__PublicMessages.hydrate(normalized);
    })
    .catch(()=>{ /* silent; section stays hidden if none */ });
})();

// Hook into existing contact form success to append publicly
(function hookContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  // Monkey-patch fetch handler by listening to custom success rendering spot
  // We observe mutations on #formMessage to detect success and then append
  const formMessage = document.getElementById('formMessage');
  if (!formMessage) return;

  const observer = new MutationObserver(() => {
    const isSuccess = /Thank you!/i.test(formMessage.textContent || '');
    if (isSuccess) {
      const name = document.getElementById('name')?.value || 'Anonymous';
      const message = document.getElementById('message')?.value || '';
      if (window.__PublicMessages) {
        window.__PublicMessages.append({ name, message });
      }
    }
  });
  observer.observe(formMessage, { childList: true, subtree: true, characterData: true });
})();

// Hardened contact form submission: better error handling for non-JSON/HTTP errors
(function strengthenContactSubmit(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  function parseJsonSafe(resp){
    return resp.text().then(t=>{ try { return JSON.parse(t); } catch(_) { return { success: resp.ok, message: t || '', error: t || '' }; } });
  }

  // Replace existing listener only if ours not attached yet
  if (!form.__hardened) {
    form.__hardened = true;
    const originalHandler = form.onsubmit;
    form.addEventListener('submit', async (e) => {
      // Let the existing listener run first (it preventsDefault and shows loaders)
      // We only augment the fetch part via interception of window.fetch if needed.
    }, { once: true });

    // Intercept the existing fetch used by contact submission
    const oldFetch = window.fetch;
    window.fetch = async function(url, opts){
      if (typeof url === 'string' && url.replace(window.location.origin, '').startsWith('/api/contact')) {
        try {
          const resp = await oldFetch(url, opts);
          if (!resp.ok) {
            const data = await parseJsonSafe(resp);
            // Synthesize a unified error structure
            return new Response(JSON.stringify({ success:false, error: data.error || `Request failed (${resp.status})` }), { status: resp.status, headers: { 'Content-Type':'application/json' } });
          }
          // Ensure JSON body even if backend returned empty
          const data = await parseJsonSafe(resp);
          return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type':'application/json' } });
        } catch (err) {
          // Network failure
          return new Response(JSON.stringify({ success:false, error:'Network error. Please try again in a moment.' }), { status: 0, headers: { 'Content-Type':'application/json' } });
        }
      }
      return oldFetch.apply(this, arguments);
    };
  }
})();

// Dynamically ensure GSAP/ScrollTo/Three are loaded with fallbacks
(function ensureVendors(){
  function loadScript(src){
    return new Promise((resolve, reject)=>{
      const s = document.createElement('script');
      s.src = src; s.async = true; s.crossOrigin = 'anonymous';
      s.onload = ()=> resolve(true);
      s.onerror = ()=> reject(new Error('load-failed:'+src));
      document.head.appendChild(s);
    });
  }
  const tasks = [];
  if (typeof window.gsap === 'undefined') {
    tasks.push(loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js').catch(()=>loadScript('https://unpkg.com/gsap@3.12.5/dist/gsap.min.js')));
  }
  tasks.push((async ()=>{
    if (typeof window.gsap !== 'undefined' && !gsap.ScrollToPlugin) {
      try { await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js'); }
      catch(_) { try { await loadScript('https://unpkg.com/gsap@3.12.5/dist/ScrollToPlugin.min.js'); } catch(_){} }
    }
  })());
  if (typeof window.THREE === 'undefined') {
    tasks.push(loadScript('https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js').catch(()=>loadScript('https://unpkg.com/three@0.155.0/build/three.min.js')));
  }
  Promise.allSettled(tasks).then(()=>{
    // no-op; subsequent code already guards if libs are missing
  });
})();

// Safer helper for parsing JSON responses
async function parseResponseSafe(resp){
  try {
    const text = await resp.text();
    try { return { ok: resp.ok, data: JSON.parse(text) }; }
    catch { return { ok: resp.ok, data: { success: resp.ok, message: text || '', error: text || '' } }; }
  } catch (e) {
    return { ok: false, data: { success:false, error:'Network error' } };
  }
}

// Patch fetch handler: already added earlier; also use parseResponseSafe if available
(function reinforceContactFetch(){
  const oldFetch = window.fetch;
  window.fetch = async function(url, opts){
    if (typeof url === 'string' && url.replace(window.location.origin, '').startsWith('/api/contact')) {
      try {
        const resp = await oldFetch(url, opts);
        const parsed = await parseResponseSafe(resp);
        return new Response(JSON.stringify(parsed.data), { status: parsed.ok ? 200 : (resp.status||400), headers: { 'Content-Type':'application/json' } });
      } catch (_) {
        return new Response(JSON.stringify({ success:false, error:'Network error. Please try again later.' }), { status: 0, headers: { 'Content-Type':'application/json' } });
      }
    }
    return oldFetch.apply(this, arguments);
  };
})();