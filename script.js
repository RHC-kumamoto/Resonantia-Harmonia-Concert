document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ヘッダー
       ========================= */

    const header = document.getElementById("header");

    if (header) {

        header.innerHTML = `
            <h1>Resonantia Harmonia Concert</h1>

            <nav>
                <a href="index.html">HOME</a>
                <a href="rhc.html">RHCとは</a>
                <a href="application.html">お申込み</a>
                <a href="documents.html">各種書類</a>
                <a href="visitors.html">ご来場の方へ</a>
                <a href="committee.html">実行委員会紹介</a>
            </nav>
        `;

    }


    /* =========================
       フッター
       ========================= */

    const footer = document.getElementById("footer");

    if (footer) {

        footer.innerHTML = `
            <div class="footer-content">

                <div class="footer-image">
                </div>

                <div class="footer-info">
                    <p>Resonantia Harmonia Concert 実行委員会</p>
                    <p>TEL：<a href="tel:08091008296">080-9100-8296</a> (代表 林田)</p>
                    <p>Email：<a href="mailto:kentachan39@icloud.com">kentachan39@icloud.com</a> (代表 林田)</p>
                    <p>運営支援・成人運営安全管理責任者：株式会社サクラハーモニー 代表 齋藤麻希</p>
                    <p>TEL：<a href="tel:07052744478">070-5274-4478</a></p>
                    <p>email：<a href="mailto:sakuraharmony55@gmail.com">sakuraharmony55@gmail.com</a></p>
                </div>

            </div>

            <div class="copyright">
                <span>© 2027 Resonantia Harmonia Concert</span>
            </div>
        `;

    }

});
