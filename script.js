document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("header");

    header.innerHTML = `
        <h1>Resonantia Harmonia Concert</h1>

        <nav>
            <a href="index.html">HOME</a>
            <a href="rhc.html">RHCとは</a>
            <a href="documents.html">各種書類ダウンロード</a>
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

});