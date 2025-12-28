# VS Code Setup Guide for Faster Development

This guide helps you set up VS Code for optimal performance with this project, ensuring fast virtual environment loading and smooth development experience.

## Quick Setup

### 1. Virtual Environment Setup

Create a virtual environment in the project root:

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

**Linux/macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. VS Code Configuration

The project includes optimized VS Code settings in `.vscode/settings.json` that:
- Specify the Python interpreter path (`.venv`)
- Disable automatic terminal activation for faster startup
- Exclude virtual environment and cache directories from file watching
- Optimize search and indexing performance

### 3. Select Python Interpreter

1. Open VS Code Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Python: Select Interpreter"
3. Choose the interpreter from `.venv` folder

## Performance Optimizations

The included VS Code settings provide:

### Fast Startup
- `python.terminal.activateEnvironment: false` - Prevents automatic activation on terminal creation
- Direct interpreter path specification - No need to search for interpreters

### Reduced File Watching
The following directories are excluded from VS Code file watching:
- `.venv/`, `venv/`, `env/` - Virtual environment files
- `node_modules/` - Frontend dependencies
- `__pycache__/` - Python cache files
- `.pytest_cache/` - Test cache
- `frontend/build/`, `frontend/dist/` - Build outputs

### Optimized Search
Search is configured to skip:
- Virtual environment directories
- Node modules
- Python cache files
- Build artifacts

## Troubleshooting

### Virtual Environment Not Loading Fast Enough

1. **Verify interpreter path**: The `.vscode/settings.json` uses a platform-agnostic path (`${workspaceFolder}/.venv`). VS Code automatically resolves this to:
   - Windows: `${workspaceFolder}/.venv/Scripts/python.exe`
   - Linux/macOS: `${workspaceFolder}/.venv/bin/python`

2. **Disable unnecessary extensions**: Disable extensions you don't need for Python/React development

3. **Increase VS Code performance**:
   - Close unused editor tabs
   - Disable preview mode: `"workbench.editor.enablePreview": false`
   - Reduce file watchers: The project already optimizes this

### Manual Interpreter Selection

If VS Code doesn't automatically detect the virtual environment:

1. Click on the Python version in the bottom-left status bar
2. Select "Enter interpreter path..."
3. Navigate to `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (Linux/macOS)

### Switching Between Environments

If you need to manually activate the virtual environment in the terminal:

**Windows:**
```bash
.venv\Scripts\activate
```

**Linux/macOS:**
```bash
source .venv/bin/activate
```

## Recommended Extensions

The project recommends these VS Code extensions (see `.vscode/extensions.json`):
- **Python** (`ms-python.python`) - Core Python language support with IntelliSense, linting, and debugging
- **Pylance** (`ms-python.vscode-pylance`) - Fast, feature-rich Python language server for improved performance
- **Prettier** (`esbenp.prettier-vscode`) - Code formatter for JavaScript/TypeScript in the React frontend

## Additional Performance Tips

1. **Use Pylance**: It's faster than the default Python language server
2. **Disable automatic linting**: The settings already disable heavy linters (pylint, flake8)
3. **Keep virtual environment out of sync**: Don't sync `.venv/` to cloud storage services
4. **Use Git exclude**: Virtual environments are already in `.gitignore`

## Environment Variables

Create a `.env` file in the project root if needed (already in `.gitignore`):
```
FLASK_ENV=development
FLASK_DEBUG=1
```

## Frontend Development

For the React frontend, the settings also optimize Node.js/npm performance by excluding:
- `frontend/node_modules/`
- `frontend/build/`
- `frontend/dist/`

## Summary

With these configurations, VS Code should:
- ✅ Load the virtual environment instantly
- ✅ Start terminals without delay
- ✅ Search files faster
- ✅ Use less CPU and memory
- ✅ Provide a smoother development experience

If you continue to experience slow loading times, check your computer's available resources and close other resource-intensive applications.
