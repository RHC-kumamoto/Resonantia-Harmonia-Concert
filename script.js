```javascript
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ヘッダー
    // ========================================

    const header = document.getElementById("header");

    if (header) {
        header.innerHTML = `
            <h1>Resonantia Harmonia Concert</h1>

            <nav>
                <a href="/Resonantia-Harmonia-Concert/index.html">HOME</a>
                <a href="/Resonantia-Harmonia-Concert/rhc.html">RHCとは</a>
                <a href="/Resonantia-Harmonia-Concert/visitors.html">来場者の方へ</a>
                <a href="/Resonantia-Harmonia-Concert/documents.html">各種書類</a>
                <a href="/Resonantia-Harmonia-Concert/committee.html">実行委員会紹介</a>
                <a href="/Resonantia-Harmonia-Concert/activities.html">活動の様子</a>
            </nav>
        `;
    }


    // ========================================
    // フッター
    // ========================================

    const footer = document.getElementById("footer");

    if (footer) {
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
    }


    // ========================================
    // 写真ページの自動表示
    // ========================================

    const gallery = document.getElementById("photo-gallery");

    // 写真ページではない場合はここで終了
    if (!gallery) {
        return;
    }


    // GitHubの情報
    const githubUser = "rhc-kumamoto";
    const repository = "Resonantia-Harmonia-Concert";


    // 現在のページが入っているフォルダ名を取得
    // 例：pr_2026-09-08
    const pathParts = location.pathname.split("/").filter(Boolean);

    const folderName = pathParts[pathParts.length - 2];


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

            // 画像ファイルだけを取得
            const images = files.filter(file =>
                file.type === "file" &&
                /\.(jpg|jpeg|png|webp)$/i.test(file.name)
            );


            if (images.length === 0) {
                gallery.innerHTML = "<p>写真がありません。</p>";
                return;
            }


            // 写真を自動的に表示
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
