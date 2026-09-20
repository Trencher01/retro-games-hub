import os

from flask import Flask, render_template, url_for

app = Flask(__name__)


def url_with_cache_bust(endpoint, **values):
    """Build a static URL and append a file mtime-based cache-busting query param."""
    url = url_for(endpoint, **values)

    if endpoint != 'static' or 'filename' not in values:
        return url

    file_path = os.path.join(app.static_folder, values['filename'])
    if not os.path.exists(file_path):
        return url

    return f"{url}?v={int(os.path.getmtime(file_path))}"


app.jinja_env.globals['url_with_cache_bust'] = url_with_cache_bust


@app.route('/')
def home():
    # Renders the main dashboard page
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)