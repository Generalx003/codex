# CarePoint Hospitals interactive explorer

A static, data-driven hospital landing page that lets users choose a body area or department to see matching doctors.

## Preview locally

Use any static file server to view the site so JavaScript runs correctly:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Make sure JavaScript is enabled; otherwise you will only see the fallback notice.

You can also open `index.html` directly in a browser, but some browsers block JavaScript module features on `file://` URLs. If you see a blank screen, prefer the local server method above.
