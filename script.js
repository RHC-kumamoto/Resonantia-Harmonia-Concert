```javascript
document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("header");

    header.innerHTML = `
        <h1>Resonantia Harmonia Concert</h1>

        <nav>
            <a href="index.html">HOME</a>
            <a href="rhc.html">RHCとは</a>
            <a href="visitors.html">来場者の方へ</a>
            <a href="documents.html">各種書類</a>
            <a href="committee.html">実行委員会紹介</a>
            <a href="activities.html">活動の様子</a>
        </nav>
    `;


    const footer = document.getElementById("footer");

    footer.innerHTML = `
        <div class="footer-content">

            <div class="footer-image">
            </div>

            <div class="footer-info">
                <p>Resonantia Harmonia Concert</p>
                <p>TEL：<a href="tel:08091008296">080-9100-8296</a> (代表 林田)</p>
                <p>Email：<a href="mailto:kentachan39@icloud.com">kentachan39@icloud.com</a> (代表 林田)</p>
                
            </div>

        </div>

        <div class="copyright">
            © 2027 Resonantia Harmonia Concert
        </div>
    `;


    // ========================================
    // 写真ページの自動表示
    // ========================================

    const gallery = document.getElementById("photo-gallery");

    // 写真ページではない場合は何もしない
    if (!gallery) {
        return;
    }

    // GitHubの情報
    const githubUser = "rhc-kumamoto";
    const repository = "Resonantia-Harmonia-Concert";

    // 現在のページが入っているフォルダ名を取得
    // 例：pr_2026-09-08
    const folderName = location.pathname.split("/").filter(Boolean).slice(-2, -1)[0];

    if (!folderName) {
        gallery.innerHTML = "<p>写真フォルダを取得できませんでした。</p>";
        return;
    }

    // GitHub API
    const apiUrl =
        `https://api.github.com/repos/${githubUser}/${repository}/contents/photos/${folderName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("GitHub APIから情報を取得できませんでした。");
            }

            return response.json();
        })

        .then(files => {

            // jpg / jpeg / png / webp の画像だけを取得
            const images = files.filter(file =>
                file.type === "file" &&
                /\.(jpg|jpeg|png|webp)$/i.test(file.name)
            );

            if (images.length === 0) {
                gallery.innerHTML = "<p>写真がありません。</p>";
                return;
            }

            images.forEach(file => {

                const img = document.createElement("img");

                img.src = file.download_url;
                img.alt = "練習の様子";

                gallery.appendChild(img);

            });

        })

        .catch(error => {

            console.error(error);

            gallery.innerHTML =
                "<p>写真を読み込めませんでした。</p>";

        });

});
```
