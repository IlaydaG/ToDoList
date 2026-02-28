##  Project Overview
This project is a responsive Todo application built with React and TypeScript.  
It focuses on clean architecture, reusable components, and separation of concerns using a custom hook structure.

##  Features
- Add, edit, delete tasks
- Toggle task completion
- Search by title or description
- Filter by All / Active / Completed
- Deadline indicator with dynamic status (Expired / Approaching)
- Persistent storage with localStorage
- Responsive grid layout
- Feature-based folder structure

##  Project Structure
The project follows a feature-based architecture:

features/
  todo/
    components/
    hooks/
    types/
    utils/

- Business logic is handled inside a custom hook (useTodos)
- UI components are kept separate from state logic
- LocalStorage logic is abstracted into a storage utility

Run the development server:
npm run dev
The app will run on Vite’s default development port (usually http://localhost:5173).

<img width="1543" height="938" alt="Ekran görüntüsü 2026-02-27 232109" src="https://github.com/user-attachments/assets/d4e1bed7-3feb-4e08-b1db-3aebbc80d5b5" />
<img width="1425" height="952" alt="Ekran görüntüsü 2026-02-27 232122" src="https://github.com/user-attachments/assets/5a50519a-3bf0-45bc-a9f3-b376eb91256c" />
<img width="901" height="443" alt="Ekran görüntüsü 2026-02-27 232135" src="https://github.com/user-attachments/assets/0d791764-2658-49e2-afb4-841b80397313" />
<img width="1339" height="421" alt="Ekran görüntüsü 2026-02-27 232150" src="https://github.com/user-attachments/assets/f61421ed-9e9f-4b42-bcc0-48f17db668b1" />
