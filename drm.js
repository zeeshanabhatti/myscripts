        // Configuration: Array of allowed Visitor IDs with expiry dates and page titles
const allowedVisitors = [
    {
        visitorID: "677150267b87cc522152ca20712cddfc",
        expiryDate: "2025-12-31T23:59:59", // Expiry date in ISO format
        allowedPageTitle: "Protected Content",
        allowedPasswords: ["book1", "book2"] // Add allowed passwords for this visitor
    },
    {
        visitorID: "2d9c8513f46d199f9fa6cb85f562427e",
        expiryDate: "2025-11-15T12:00:00", // Expiry date in ISO format
        allowedPageTitle: "Protected Content",
        allowedPasswords: ["book1"] // No passwords allowed for this visitor
    },
    {
        visitorID: "def789visitorId3",
        expiryDate: "2023-10-20T18:30:00", // Expiry date in ISO format
        allowedPageTitle: "Another Page",
        allowedPasswords: [] // No passwords allowed for this visitor
    }
];

        // Function to format the expiry date as "31 March 2025"
        function formatExpiryDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options); // Formats as "31 March 2025"
        }

        // Function to check access
async function checkAccess() {
    const visitorIdElement = document.getElementById('visitor-id');
    const protectedContent = document.getElementById('protected-content');
    const accessDeniedMessage = document.getElementById('access-denied');
    const copyButton = document.getElementById('copy-button');
    const hideButton = document.getElementById('hide-button');
    const expiryDateElement = document.getElementById('expiry-date'); // Expiry date element

            let visitorID;

            // Check if the Visitor ID is stored in localStorage
            if (localStorage.getItem('visitorID')) {
                visitorID = localStorage.getItem('visitorID');
            } else {
                // Generate Visitor ID if not found in localStorage
                const fpPromise = FingerprintJS.load();
                const fp = await fpPromise;
                const result = await fp.get();
                visitorID = result.visitorId;

                // Store the generated Visitor ID in localStorage
                localStorage.setItem('visitorID', visitorID);
            }

    // Display Visitor ID
    visitorIdElement.textContent = visitorID;

    // Find the allowed visitor configuration
    const allowedVisitor = allowedVisitors.find(v => v.visitorID === visitorID);

    if (allowedVisitor) {
        // Check if the page title matches
        if (document.title !== allowedVisitor.allowedPageTitle) {
            accessDeniedMessage.textContent = "This page is not authorized for your Visitor ID.";
            return;
        }

        // Check if the access has expired
        const expiryDate = new Date(allowedVisitor.expiryDate);
        const currentTime = new Date();

        if (currentTime <= expiryDate) {
            // Allow access
            protectedContent.style.display = 'block';
            accessDeniedMessage.style.display = 'none';

            // Hide the Copy Visitor ID button
            copyButton.style.display = 'none';

            // Show the "Hide" button
            hideButton.style.display = 'inline-block';

            // Format and display the expiry date
            expiryDateElement.textContent = `Expires on: ${formatExpiryDate(allowedVisitor.expiryDate)}`;
            expiryDateElement.style.display = 'inline-block'; // Show the expiry date
        } else {
            // Access expired
            accessDeniedMessage.textContent = "Your access has expired.";
        }
    } else {
        // Access denied
        accessDeniedMessage.textContent = "You do not have permission to view this content.";
    }
}

        // Function to copy Visitor ID to clipboard
        function copyVisitorID() {
            const visitorIdElement = document.getElementById('visitor-id');
            const visitorID = visitorIdElement.textContent;

            navigator.clipboard.writeText(visitorID)
                .then(() => {
                    alert('Visitor ID copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Failed to copy Visitor ID:', error);
                });
        }

        // Function to hide the visitor ID portion
        function hideVisitorID() {
            const visitorIdContainer = document.getElementById('visitor-id-container');
            visitorIdContainer.style.display = 'none'; // Hide the visitor ID portion
        }

        // Function to open the Contact Us website
        function openContactUs() {
            window.open('https://www.computercourse.pk', '_blank');
        }

        // Function to open the "Protected By" website
        function openProtectedBy() {
            window.open('https://www.fiverr.com/zeeshanabhatti', '_blank');
        }

        // Add event listeners
        document.getElementById('copy-button').addEventListener('click', copyVisitorID);
        document.getElementById('contact-button').addEventListener('click', openContactUs);
        document.getElementById('hide-button').addEventListener('click', hideVisitorID);
        document.getElementById('protected-by-button').addEventListener('click', openProtectedBy);

        // Check access when the page loads
        checkAccess();
