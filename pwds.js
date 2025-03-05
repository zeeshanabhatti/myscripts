    let pdfDoc = null;
    let scale = 1.5; // Default zoom setting
    let currentPage = 1;

    // Define an array of passwords with unique IDs
    const passwords = [
      { id: 'book1', password: 'PredefinedPassword.document.getElementByIdbook1' },
      { id: 'book2', password: '456456' },
      { id: 'book3', password: '789789' }
    ];

    // To store unique links across the current page only
    let pageLinksSet = new Set();

    // Function to update page info
    function updatePageInfo() {
      const pageInfo = document.getElementById('pageInfo');
      if (pdfDoc) {
        pageInfo.textContent = `Page ${currentPage} of ${pdfDoc.numPages}`;
      } else {
        pageInfo.textContent = `Page 0 of 0`; // Default value before PDF is loaded
      }
    }

    // Home button to refresh the page
    document.getElementById('homeButton').addEventListener('click', function() {
      location.reload(); // Refresh the page when the home button is clicked
    });

    // Function to observe page visibility and update currentPage
    function observePageVisibility() {
      const pages = document.querySelectorAll('#pdfContainer canvas');
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the page is visible
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNumber = parseInt(entry.target.getAttribute('data-page'), 10);
            currentPage = pageNumber; // Update currentPage
            updatePageInfo(); // Update the page info in the toolbar
            console.log(`Page ${pageNumber} is now visible`); // Debugging
          }
        });
      }, options);

      // Observe all pages
      pages.forEach((page) => {
        observer.observe(page);
      });
    }

    document.getElementById('fileInput').addEventListener('change', function(event) {
      const file = event.target.files[0];

      if (file && file.type === 'application/pdf') {
        // Reset the links before loading a new file
        pageLinksSet.clear();

        // Hide the file input container (including the "Choose File" button and file name)
        document.getElementById('fileInputContainer').classList.add('hidden');

        const reader = new FileReader();

        reader.onload = function(e) {
          const pdfData = e.target.result;

          // Try loading the PDF with each password
          tryPasswords(pdfData);
        };

        reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
      } else {
        alert("Please select a valid PDF file.");
      }
    });

    // Function to try all passwords
async function tryPasswords(pdfData) {
    const visitorIdElement = document.getElementById('visitor-id');
    const visitorID = visitorIdElement.textContent;

    // Find the allowed visitor configuration
    const allowedVisitor = allowedVisitors.find(v => v.visitorID === visitorID);

    if (!allowedVisitor || !allowedVisitor.allowedPasswords || allowedVisitor.allowedPasswords.length === 0) {
        alert('You do not have permission to access any passwords.');
        location.reload(); // Refresh the page
        return;
    }

    let passwordAttempted = false;

    // Loop through the password array to try each password
    for (let i = 0; i < passwords.length; i++) {
        const { id, password } = passwords[i];

        // Check if the password ID is allowed for this visitor
        if (!allowedVisitor.allowedPasswords.includes(id)) {
            console.log(`Password ${id} is not allowed for this visitor.`);
            continue; // Skip this password
        }

        try {
            const pdf = await pdfjsLib.getDocument({ data: pdfData, password: password }).promise;
            pdfDoc = pdf;
            console.log(`Successfully loaded PDF with password from ${id}`); // Success message with the password ID

            renderAllPages(); // Render all pages
            updatePageInfo(); // Update page info after loading PDF
            return; // Exit after successful load
        } catch (error) {
            // If loading fails, continue trying the next password
            console.log(`Failed to load PDF with password from ${id}`);
        }
    }

    // If none of the allowed passwords work
    alert('Failed to load PDF. The PDF may be invalid or require permission.');
    location.reload(); // This will refresh the page
}

    async function renderAllPages() {
      const pdfContainer = document.getElementById('pdfContainer');
      pdfContainer.innerHTML = ''; // Clear previous content

      // Loop through all pages and render them
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = document.createElement('canvas');
        canvas.setAttribute('data-page', pageNum); // Store the page number in the data attribute
        pdfContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: scale });

        // Set canvas size to match PDF page size
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page with high-quality settings
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          intent: 'print', // High-quality rendering
          enableWebGL: true, // Enable WebGL for better performance
          imageSmoothingEnabled: true, // Enable anti-aliasing
        };
        await page.render(renderContext).promise;

        // Render hyperlinks for the current page
        renderHyperlinks(pageNum, page);
      }

      // Add a small delay before observing pages to ensure they are fully rendered
      setTimeout(() => {
        observePageVisibility();
      }, 500); // 500ms delay
    }

    async function renderHyperlinks(pageNum, page) {
      const annotations = await page.getAnnotations();
      const hyperlinks = annotations.filter(annotation => annotation.subtype === 'Link' && annotation.url);

      // Create a new Set to store unique links for this specific page
      const pageLinks = new Set(hyperlinks.map(link => link.url));

      // Add the unique links from this page to the pageLinksSet
      pageLinks.forEach(link => pageLinksSet.add(link));

      // Render hyperlinks only for this page
      if (pageLinks.size > 0) {
        const linksContainer = document.createElement('ul');
        linksContainer.classList.add('hyperlink-list');

        // Iterate through unique links in the current page's Set
        pageLinks.forEach(linkUrl => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = linkUrl;
          anchor.textContent = linkUrl;
          anchor.target = '_blank';
          listItem.appendChild(anchor);
          linksContainer.appendChild(listItem);
        });

        const canvas = document.querySelector(`#pdfContainer canvas[data-page="${pageNum}"]`);
        canvas.insertAdjacentElement('afterend', linksContainer); // Insert links after the corresponding canvas
      }
    }

    // Zoom In and Zoom Out functionality
    document.getElementById('zoomIn').addEventListener('click', function() {
      scale += 0.25;
      if (pdfDoc) {
        renderAllPages(); // Re-render all pages after zoom change
      }
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
      if (scale > 0.5) {
        scale -= 0.25;
        if (pdfDoc) {
          renderAllPages(); // Re-render all pages after zoom change
        }
      }
    });

    // Previous Page functionality
    document.getElementById('prevPage').addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage--;
        updateActivePage(); // Show the correct page
        updatePageInfo(); // Update page info after navigating
      }
    });

    // Next Page functionality
    document.getElementById('nextPage').addEventListener('click', function() {
      if (pdfDoc && currentPage < pdfDoc.numPages) {
        currentPage++;
        updateActivePage(); // Show the correct page
        updatePageInfo(); // Update page info after navigating
      }
    });

    // Function to update active page
    function updateActivePage() {
      const allPages = document.querySelectorAll('#pdfContainer canvas');
      allPages.forEach((page) => {
        page.classList.remove('active'); // Remove active class from all pages
      });
      const activePage = document.querySelector(`#pdfContainer canvas[data-page="${currentPage}"]`);
      if (activePage) {
        activePage.classList.add('active'); // Highlight the active page
        activePage.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the top of the active page
      }
    }

    // Call updatePageInfo initially to show default "Page 0 of 0"
    updatePageInfo();
