document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       Supabase設定
       ========================= */

    const SUPABASE_URL =
        "https://nfqqznuhwxrqugzwyygy.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_3eC3npHi0YI6L6RtWycRiQ_KMLv6RXy";


    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


    /* =========================
       管理ページのパスワード
       ========================= */

    const ADMIN_PASSWORD = "RHC2027htitk";


    /* =========================
       HTML要素
       ========================= */

    const loginSection =
        document.getElementById("login-section");

    const adminSection =
        document.getElementById("admin-section");

    const passwordInput =
        document.getElementById("admin-password");

    const loginButton =
        document.getElementById("login-button");

    const loginMessage =
        document.getElementById("login-message");

    const dateInput =
        document.getElementById("news-date-input");

    const titleInput =
        document.getElementById("news-title-input");

    const detailInput =
        document.getElementById("news-detail-input");

    const saveButton =
        document.getElementById("save-news-button");

    const cancelEditButton =
        document.getElementById("cancel-edit-button");

    const formTitle =
        document.getElementById("form-title");

    const adminMessage =
        document.getElementById("admin-message");

    const adminNewsList =
        document.getElementById("admin-news-list");


    let editingNewsId = null;


    /* =========================
       ログイン
       ========================= */

    loginButton.addEventListener("click", function () {

        const password =
            passwordInput.value;

        if (password === ADMIN_PASSWORD) {

            loginSection.style.display =
                "none";

            adminSection.classList.remove(
                "admin-hidden"
            );

            loadAdminNews();

        } else {

            loginMessage.textContent =
                "パスワードが正しくありません。";

            loginMessage.style.display =
                "block";

            passwordInput.value = "";

        }

    });


    /* Enterキーでもログイン */

    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                loginButton.click();

            }

        }
    );


    /* =========================
       お知らせ一覧取得
       ========================= */

    async function loadAdminNews() {

        adminNewsList.innerHTML = `
            <p>読み込んでいます……</p>
        `;


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

            console.error(
                "お知らせ取得エラー:",
                error
            );


            adminNewsList.innerHTML = `
                <p class="news-error">
                    お知らせを読み込めませんでした。
                </p>
            `;

            return;

        }


        if (!data || data.length === 0) {

            adminNewsList.innerHTML = `
                <p>
                    登録されているお知らせはありません。
                </p>
            `;

            return;

        }


        adminNewsList.innerHTML = "";


        data.forEach(function (item) {

            const newsItem =
                document.createElement("div");

            newsItem.className =
                "admin-news-item";


            const date =
                document.createElement("div");

            date.className =
                "admin-news-date";

            date.textContent =
                formatDate(item.date);


            const title =
                document.createElement("div");

            title.className =
                "admin-news-title";

            title.textContent =
                item.title;


            const detail =
                document.createElement("div");

            detail.className =
                "admin-news-detail";

            detail.textContent =
                item.detail;


            const buttonGroup =
                document.createElement("div");

            buttonGroup.className =
                "admin-button-group";


            /* =========================
               編集ボタン
               ========================= */

            const editButton =
                document.createElement("button");

            editButton.className =
                "admin-button admin-button-edit";

            editButton.textContent =
                "編集";


            editButton.addEventListener(
                "click",
                function () {

                    startEdit(item);

                }
            );


            /* =========================
               削除ボタン
               ========================= */

            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "admin-button admin-button-delete";

            deleteButton.textContent =
                "削除";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteNews(item.id);

                }
            );


            buttonGroup.appendChild(
                editButton
            );

            buttonGroup.appendChild(
                deleteButton
            );


            newsItem.appendChild(date);

            newsItem.appendChild(title);

            newsItem.appendChild(detail);

            newsItem.appendChild(buttonGroup);


            adminNewsList.appendChild(
                newsItem
            );

        });

    }


    /* =========================
       お知らせ追加・更新
       ========================= */

    saveButton.addEventListener(
        "click",
        async function () {

            const date =
                dateInput.value;

            const title =
                titleInput.value.trim();

            const detail =
                detailInput.value.trim();


            /* =========================
               入力チェック
               ========================= */

            if (!date || !title || !detail) {

                showAdminMessage(
                    "日付・タイトル・詳細をすべて入力してください。"
                );

                return;

            }


            saveButton.disabled = true;


            try {

                /* =========================
                   新規追加
                   ========================= */

                if (editingNewsId === null) {

                    const { data, error } =
                        await supabaseClient
                            .from("news")
                            .insert([
                                {
                                    date: date,
                                    title: title,
                                    detail: detail
                                }
                            ])
                            .select();


                    if (error) {

                        console.error(
                            "お知らせ追加エラー:",
                            error
                        );

                        throw error;

                    }


                    console.log(
                        "お知らせ追加成功:",
                        data
                    );


                    showAdminMessage(
                        "お知らせを追加しました。"
                    );


                } else {

                    /* =========================
                       編集
                       ========================= */

                    const { data, error } =
                        await supabaseClient
                            .from("news")
                            .update({
                                date: date,
                                title: title,
                                detail: detail
                            })
                            .eq(
                                "id",
                                editingNewsId
                            )
                            .select();


                    if (error) {

                        console.error(
                            "お知らせ更新エラー:",
                            error
                        );

                        throw error;

                    }


                    console.log(
                        "お知らせ更新成功:",
                        data
                    );


                    showAdminMessage(
                        "お知らせを更新しました。"
                    );

                }


                resetForm();

                await loadAdminNews();


            } catch (error) {

                console.error(
                    "保存エラー:",
                    error
                );


                /* =========================
                   Supabaseエラーの詳細表示
                   ========================= */

                let errorMessage =
                    "保存に失敗しました。";


                if (error) {

                    if (error.message) {

                        errorMessage +=
                            "\n\nエラー内容：\n" +
                            error.message;

                    }


                    if (error.details) {

                        errorMessage +=
                            "\n\n詳細：\n" +
                            error.details;

                    }


                    if (error.hint) {

                        errorMessage +=
                            "\n\nヒント：\n" +
                            error.hint;

                    }


                    if (error.code) {

                        errorMessage +=
                            "\n\nエラーコード：\n" +
                            error.code;

                    }

                }


                showAdminMessage(
                    errorMessage
                );

            } finally {

                saveButton.disabled =
                    false;

            }

        }
    );


    /* =========================
       編集開始
       ========================= */

    function startEdit(item) {

        editingNewsId =
            item.id;


        dateInput.value =
            item.date;

        titleInput.value =
            item.title;

        detailInput.value =
            item.detail;


        formTitle.textContent =
            "お知らせを編集";


        saveButton.textContent =
            "変更を保存";


        cancelEditButton.style.display =
            "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================
       編集キャンセル
       ========================= */

    cancelEditButton.addEventListener(
        "click",
        function () {

            resetForm();

        }
    );


    /* =========================
       フォームリセット
       ========================= */

    function resetForm() {

        editingNewsId =
            null;


        dateInput.value =
            "";

        titleInput.value =
            "";

        detailInput.value =
            "";


        formTitle.textContent =
            "お知らせを追加";


        saveButton.textContent =
            "お知らせを追加";


        cancelEditButton.style.display =
            "none";

    }


    /* =========================
       お知らせ削除
       ========================= */

    async function deleteNews(id) {

        const confirmed =
            window.confirm(
                "このお知らせを削除しますか？\n\nこの操作は元に戻せません。"
            );


        if (!confirmed) {

            return;

        }


        const { error } =
            await supabaseClient
                .from("news")
                .delete()
                .eq(
                    "id",
                    id
                );


        if (error) {

            console.error(
                "削除エラー:",
                error
            );


            let errorMessage =
                "削除に失敗しました。";


            if (error.message) {

                errorMessage +=
                    "\n\nエラー内容：\n" +
                    error.message;

            }


            if (error.details) {

                errorMessage +=
                    "\n\n詳細：\n" +
                    error.details;

            }


            if (error.hint) {

                errorMessage +=
                    "\n\nヒント：\n" +
                    error.hint;

            }


            if (error.code) {

                errorMessage +=
                    "\n\nエラーコード：\n" +
                    error.code;

            }


            showAdminMessage(
                errorMessage
            );

            return;

        }


        showAdminMessage(
            "お知らせを削除しました。"
        );


        await loadAdminNews();

    }


    /* =========================
       メッセージ表示
       ========================= */

    function showAdminMessage(message) {

        adminMessage.textContent =
            message;

        adminMessage.style.display =
            "block";


        /* エラーが長い場合に備えて
           少し長めに表示 */

        const displayTime =
            message.length > 100
                ? 10000
                : 3000;


        setTimeout(
            function () {

                adminMessage.style.display =
                    "none";

            },
            displayTime
        );

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

});
