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
                <a href="visitors.html">来場者の方へ</a>
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
                    <p>Resonantia Harmonia Concert</p>
                    <p>TEL：<a href="tel:08091008296">080-9100-8296</a> (代表 林田)</p>
                    <p>Email：<a href="mailto:kentachan39@icloud.com">kentachan39@icloud.com</a> (代表 林田)</p>
                </div>

            </div>

            <div class="copyright">
                <span>© 2027 Resonantia Harmonia Concert</span>
            </div>
        `;

    }


    /* =========================
       HOMEのみ管理者用ボタンを表示
       ========================= */

    const currentPage =
        window.location.pathname.split("/").pop();

    const isHome =
        currentPage === "" ||
        currentPage === "index.html";


    if (isHome && footer) {

        const copyright =
            footer.querySelector(".copyright");

        if (copyright) {

            const adminLink =
                document.createElement("a");

            adminLink.href = "admin.html";

            adminLink.className = "admin-link";

            adminLink.textContent = "管理者用";

            copyright.appendChild(adminLink);

        }

    }


    /* =========================
       お知らせ
       ========================= */

    async function loadNews() {

        const newsList =
            document.getElementById("news-list");

        const newsLoading =
            document.getElementById("news-loading");

        const newsError =
            document.getElementById("news-error");

        const showMoreButton =
            document.getElementById("show-more-news");


        if (!newsList) {
            return;
        }


        /* =========================
           Supabase設定
           ========================= */

        const SUPABASE_URL =
            "https://nfqqznuhwxrqugzwyygy.supabase.co";

        const SUPABASE_PUBLISHABLE_KEY =
            "sb_publishable_3eC3npHi0YI6L6RtWycRiQ_KMLv6RXy";


        if (!window.supabase) {

            console.error(
                "Supabaseのライブラリが読み込まれていません。"
            );

            if (newsLoading) {
                newsLoading.style.display = "none";
            }

            if (newsError) {
                newsError.style.display = "block";
            }

            return;
        }


        const supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );


        try {

            const { data, error } =
                await supabaseClient
                    .from("news")
                    .select(
                        "id, date, title, detail, created_at"
                    )
                    .order(
                        "date",
                        { ascending: false }
                    )
                    .order(
                        "created_at",
                        { ascending: false }
                    );


            if (error) {
                throw error;
            }


            if (newsLoading) {
                newsLoading.style.display = "none";
            }


            if (!data || data.length === 0) {

                newsList.innerHTML = `
                    <p class="news-empty">
                        現在、お知らせはありません。
                    </p>
                `;

                if (showMoreButton) {
                    showMoreButton.style.display = "none";
                }

                return;
            }


            /* =========================
               お知らせを作成
               ========================= */

            data.forEach(function (item, index) {

                const details =
                    document.createElement("details");

                details.className = "news-item";


                if (index >= 3) {
                    details.style.display = "none";
                }


                const summary =
                    document.createElement("summary");


                const dateSpan =
                    document.createElement("span");

                dateSpan.className = "news-date";

                dateSpan.textContent =
                    formatDate(item.date);


                summary.appendChild(dateSpan);

                summary.appendChild(
                    document.createTextNode(item.title)
                );


                const detailDiv =
                    document.createElement("div");

                detailDiv.className =
                    "news-detail";


                const detailParagraph =
                    document.createElement("p");

                detailParagraph.textContent =
                    item.detail;


                detailDiv.appendChild(
                    detailParagraph
                );


                details.appendChild(summary);

                details.appendChild(detailDiv);

                newsList.appendChild(details);

            });


            /* =========================
               もっと見るボタン
               ========================= */

            if (data.length > 3 && showMoreButton) {

                showMoreButton.style.display = "block";

                showMoreButton.textContent =
                    "もっと見る";


                showMoreButton.addEventListener(
                    "click",
                    function () {

                        const isExpanded =
                            showMoreButton.textContent.trim() ===
                            "表示を減らす";


                        if (!isExpanded) {

                            data.forEach(
                                function (item, index) {

                                    if (index >= 3) {

                                        const newsItem =
                                            newsList.children[index];

                                        if (newsItem) {
                                            newsItem.style.display = "";
                                        }

                                    }

                                }
                            );


                            showMoreButton.textContent =
                                "表示を減らす";


                        } else {

                            data.forEach(
                                function (item, index) {

                                    if (index >= 3) {

                                        const newsItem =
                                            newsList.children[index];

                                        if (newsItem) {
                                            newsItem.style.display =
                                                "none";
                                        }

                                    }

                                }
                            );


                            showMoreButton.textContent =
                                "もっと見る";

                        }

                    }
                );

            } else {

                if (showMoreButton) {
                    showMoreButton.style.display = "none";
                }

            }

        }


        /* =========================
           エラー処理
           ========================= */

        catch (error) {

            console.error(
                "お知らせの取得に失敗しました:",
                error
            );


            if (newsLoading) {
                newsLoading.style.display = "none";
            }


            if (newsError) {
                newsError.style.display = "block";
            }


            if (showMoreButton) {
                showMoreButton.style.display = "none";
            }

        }

    }


    /* =========================
       日付表示
       ========================= */

    function formatDate(dateString) {

        if (!dateString) {
            return "";
        }


        const parts =
            dateString.split("-");


        if (parts.length !== 3) {
            return dateString;
        }


        return `${parts[0]}/${parts[1]}/${parts[2]}`;

    }


    /* =========================
       お知らせ読み込み開始
       ========================= */

    loadNews();

});
