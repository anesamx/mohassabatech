import { getDatabase } from "./databasefr.js"; // Import the getDatabase function
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; // Import necessary Firestore functions
import { checkLoginStatus } from "./auth.js";

const db = getDatabase();


async function fetchAllAnnouncements() {
  try {
    const announcementsCollection = collection(db, "announcements");
    const q = query(announcementsCollection, orderBy("createdAt", "desc")); // Add the order by
    const querySnapshot = await getDocs(q);
    const announcements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
    }));
    return announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

async function displayAnnouncements(announcements) {
  const announcementsList = document.getElementById("old-announcements");
  if (!announcementsList) {
    console.error("old-announcements not found in the DOM");
    return;
  }
  announcementsList.innerHTML = ""; // Clear existing list
  announcements.forEach(announcement => {
    const announcementItem = document.createElement("li");
    announcementItem.className = "scrollable-list-item"; // Re-add this class
    announcementItem.innerHTML = `<strong>${announcement.title}</strong><p>${announcement.description}</p> <p class="text-sm text-gray-600"> ${announcement.createdAt} </p>`;
    announcementsList.appendChild(announcementItem);
  });
}

(async () => {
      // Initialize Firebase Authentication
      const { isLoggedIn, userRole } = await new Promise((resolve) => {
        checkLoginStatus((isLoggedIn, userRole) => {
            console.log("fetchJobs - checkLoginStatus callback - isLoggedIn:", isLoggedIn);
            console.log("fetchJobs - checkLoginStatus callback - userRole:", userRole);
          resolve({ isLoggedIn, userRole });
        });
      }); 
    const announcements = await fetchAllAnnouncements();
    displayAnnouncements(announcements);
})();
