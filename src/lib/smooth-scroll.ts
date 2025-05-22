'use client';

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  
  // If we're not on the home page, navigate there first with the section ID
  if (window.location.pathname !== '/') {
    window.location.href = `/#${sectionId}`;
    // The scroll will be handled by the useEffect in the page component
    return;
  }
  
  scrollToElement(sectionId);
};

export const scrollToElement = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update URL without adding to history
    window.history.pushState(null, '', `/#${sectionId}`);
  }
};
