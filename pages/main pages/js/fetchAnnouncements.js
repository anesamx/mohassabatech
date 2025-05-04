import { getDatabase } from "./databasefr.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getDatabase();

export async function fetchAndDisplayAnnouncements(category = null) {
  const announcementsList = document.getElementById('announcements-list');
  if (!announcementsList) {
    console.error("announcements-list not found in the DOM");
    return;
  }
  announcementsList.innerHTML = '';
    try{
      const announcementsCollection = collection(db, "announcements");
      const q = query(announcementsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      let announcements = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
      }));
      if (category) {
        announcements = announcements.filter(announcement => announcement.category === category);
      }

      if (announcements.length === 0) {
        const noAnnouncementsItem = document.createElement('li');
        noAnnouncementsItem.textContent = 'No announcements for this category.';
        announcementsList.appendChild(noAnnouncementsItem);
        return;
      }

      announcements.forEach(announcement => {
        const announcementItem = document.createElement('li');
        announcementItem.style.padding = "0.75rem 0";
        announcementItem.style.borderBottom = "1px solid #e2e8f0";
        
        const titleP = document.createElement('p');
        titleP.style.fontSize = "1.2rem";
        titleP.style.fontWeight = "bold";
        titleP.style.marginBottom = "0.2rem";
        titleP.textContent = announcement.title;
        const descriptionP = document.createElement('p');
        descriptionP.style.marginTop = '0.5rem';
        descriptionP.style.marginBottom = "0.2rem";
        descriptionP.style.fontSize = "1rem";
        descriptionP.textContent = announcement.description;
        const createdAtP = document.createElement('p');
        createdAtP.style.marginTop = "auto";
        createdAtP.style.display = "block";
        createdAtP.style.textAlign = "right";
        createdAtP.style.fontSize = "0.8rem";
        createdAtP.style.marginBottom = "0.2rem";
        createdAtP.textContent = announcement.createdAt;
        announcementItem.appendChild(titleP);
        announcementItem.appendChild(descriptionP);
        announcementItem.appendChild(createdAtP);
        announcementsList.appendChild(announcementItem);
      });
    }catch (error) {
        console.error("Error fetching or displaying announcements:", error);
    }
}