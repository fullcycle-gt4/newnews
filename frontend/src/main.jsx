import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getUsers, getCategories, getNews } from './services/mocked/data.jsx'


function App() {
    const categories = getCategories();
    const users = getUsers();
    const news = getNews();

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <span>{category.icon}</span> - <span>category.id: {category.id}</span> -
                        <strong> {category.name}</strong> - {category.description}
                    </li>
                ))}
            </ul>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} width="50" height="50" />
                        <strong>{user.name}</strong> - {user.email}
                        <br />
                        <span>Preferências: </span><br />
                        <span>Modo escuro: </span>
                        {user.preferences.darkMode ? <span>🌙</span> : <span>☀️</span>}<br />
                        <span>Notificações por email: </span>
                        <span>{user.preferences.emailNotifications ? <span>✉️</span> : <span>❌</span>}</span>
                        <span> - Categorias favoritas: </span>
                        <ul>
                            {user.preferences.favoriteCategoriesIds.map((catId) => {
                                const category = categories.find(c => c.id === catId);
                                return (
                                    <li key={catId}>
                                        {category ? (
                                            <span>{category.icon} - {category.name}</span>
                                        ) : (
                                            <span>Categoria não encontrada</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
            <h1>News</h1>
            <ul>
                {news.map((article) => (
                    <li key={article.id}>
                        <p>{article.id}</p>
                        <p>{article.categoryId} -{categories.find(c => c.id === article.categoryId)?.icon || 'Categoria não encontrada'} - {categories.find(c => c.id === article.categoryId)?.name || 'Categoria não encontrada'}</p>
                        <img src={article.imageUrl} alt={article.imageAlt} width="100" height="100" />
                        <strong>{article.title}</strong> - {article.shortSummary}
                    </li>
                ))}
            </ul>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)