export const defaultCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandbox Demo</title>
    <style>
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.5);
            text-align: center;
            max-width: 400px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card:hover {
            transform: translateY(-5px);
        }

        h1 {
            color: #1e293b;
            margin-top: 0;
            margin-bottom: 1rem;
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.025em;
        }

        p {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 2rem;
        }

        .actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        button:hover {
            background: #2563eb;
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        button.secondary {
            background: transparent;
            color: #475569;
            box-shadow: inset 0 0 0 2px #cbd5e1;
        }

        button.secondary:hover {
            background: #f8fafc;
            color: #0f172a;
            box-shadow: inset 0 0 0 2px #94a3b8;
        }
        
        #dynamic-content {
             margin-top: 1.5rem;
             display: flex;
             flex-direction: column;
             gap: 0.5rem;
        }
        
        .badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Hello from Sandbox! ✨</h1>
        <p>This entire view is running securely inside an isolated iframe.</p>
        
        <div class="actions">
            <button onclick="addBadge()">Add Element</button>
            <button class="secondary" onclick="alert('JavaScript works seamlessly!')">Test Alert</button>
        </div>
        
        <div id="dynamic-content"></div>
    </div>

    <script>
        let count = 0;
        function addBadge() {
            count++;
            const container = document.getElementById('dynamic-content');
            const newElement = document.createElement('div');
            newElement.className = 'badge';
            newElement.textContent = \`Interaction #\${count}\`;
            container.appendChild(newElement);
        }
    </script>
</body>
</html>`;
