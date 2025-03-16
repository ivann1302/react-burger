import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd'; // Импортируем DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Импортируем бэкенд для HTML5
import App from './components/app/app';
import './styles.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<DndProvider backend={HTML5Backend}>
			<Router>
				<App />
			</Router>
		</DndProvider>
	</StrictMode>
);
