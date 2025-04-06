import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --glass-background: rgba(255, 255, 255, 0.95);
    --glass-border: rgba(0, 0, 0, 0.1);
    --glass-hover: rgba(255, 255, 255, 0.98);
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --accent-primary: #3498db;
    --accent-secondary: #2ecc71;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --container-width: 1200px;
    --container-padding: 2rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #ffffff);
    color: var(--text-primary);
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  input, textarea {
    font-family: inherit;
    transition: all 0.2s ease;
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent-secondary);
    }
  }

  .container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .glass-card {
    background: var(--glass-background);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-sm);
    border: none;
    font-weight: 500;
    transition: all 0.2s ease;

    &-primary {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      box-shadow: var(--shadow-sm);

      &:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }
    }

    &-secondary {
      background: var(--glass-background);
      color: var(--text-primary);
      border: 1px solid var(--glass-border);

      &:hover {
        background: var(--glass-hover);
      }
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`; 