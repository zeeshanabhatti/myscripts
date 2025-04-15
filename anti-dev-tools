(() => {
    // Console flood protection
    let scriptSrc = document.createElement("script");
    scriptSrc.innerText = 'for (var i = 111; i < 222; i++) { console.error("%c[" + i.toString(16) + "] Stealth HTML Protector!", "font-size: 25px; text-shadow: 0 0 1px black; color: red;") }';
    document.head.appendChild(scriptSrc);

    // Main Stealth HTML Protector object
    const HtmlGuard = {
        protections: {
            antiDevTools() {
                function isNative(func) {
                    return typeof func === "function" && (
                        window.eval.toString().includes("return") === false &&
                        window.eval.toString().includes("[native code]") &&
                        window.eval.toString().length < 40
                    )
                }

                let antiDevToolsInterval = setInterval(() => {
                    if (!isNative(Date.now) || !isNative(window.eval) || window.eval("2+2") !== 4) {
                        alert("Do not spoof functions!");
                        document.head.innerHTML = "";
                        document.body.innerHTML = "";
                        location.reload();
                        clearInterval(antiDevToolsInterval);
                    }

                    let started = Date.now(), end;
                    window.eval("// The use of Developer Tools is prohibited in this web application\n" + "debugger");
                    end = Date.now();

                    if ((end - started) > 50) {
                        alert("Developer Tools are not allowed!");
                        document.head.innerHTML = "";
                        document.body.innerHTML = "";
                        location.reload();
                        clearInterval(antiDevToolsInterval);
                    }
                }, 150);
            },
            blockContextMenu() {
                document.oncontextmenu = () => false;
            },
            blockDrag() {
                document.ondragstart = () => false;
            },
            blockSelection() {
                document.onselectstart = () => false;
            },
            blockConsoleOutput() {
                ["log", "debug", "warn", "error", "dir", "dirxml", "assert", "table"].forEach(funcName => {
                    console[funcName] = () => null;
                });
            }
        },
        loader: {
            loadStyleByRef(stylePath) {
                let styleLink = document.createElement("link");
                styleLink.rel = "stylesheet";
                styleLink.href = stylePath;
                document.head.appendChild(styleLink);
            },
            loadScriptBySrc(scriptPath) {
                let scriptSrc = document.createElement("script");
                scriptSrc.src = scriptPath;
                document.head.appendChild(scriptSrc);
            }
        }
    };

    // Initial checks and protections
    if (Math.random() == Math.random() == Math.random()) {
        document.head.innerHTML = "";
        document.body.innerHTML = "";
        location.reload();
    }

    document.onkeydown = (e) => {
        if (event.keyCode == 123) return false;
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    }

    // DOM manipulation after content loads
    document.addEventListener("DOMContentLoaded", () => {
        function generateRandomString(min, max) {
            if (min > max) throw new RangeError("min > max");
            const length = Math.floor(Math.random() * (max - min + 1)) + min;
            const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let randomString = "";
            for (let i = 0; i < length; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomString;
        }

        function randomByRange(min, max) {
            if (min > max) throw new RangeError("min > max");
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function obfuscatePageSource() {
            const attributeName = "stealth-html-protector",
                  notGuardedSelector = ":not([" + attributeName + "])";

            // Junk comments
            for (const element of document.querySelectorAll("*" + notGuardedSelector)) {
                for (var i = 0; i < randomByRange(5, 15); i++) {
                    let comment = "";
                    for (var o = 0; o < randomByRange(10, 20); o++) {
                        comment += generateRandomString(1, 5) + "\n";
                    }
                    element.parentNode.insertBefore(document.createComment(comment), element);
                }
            }

            // Fake IDs
            for (const element of document.querySelectorAll(":not([id])" + notGuardedSelector)) {
                element.id = generateRandomString(5, 15);
            }

            // Protected attributes
            for (const element of document.querySelectorAll("*")) {
                const attributes = element.attributes;
                for (const attribute of attributes) {
                    if (attribute.name.startsWith("_")) {
                        element.setAttribute(attribute.name.substring(1), attribute.value);
                        element.removeAttribute(attribute.name);
                    }
                }
            }

            // Junk classes and attributes
            for (const element of document.querySelectorAll("*" + notGuardedSelector)) {
                for (let i = 0; i < randomByRange(1, 8); i++) {
                    element.classList.add(generateRandomString(6, 20));
                }
                for (let i = 0; i < randomByRange(10, 55); i++) {
                    element.setAttribute(generateRandomString(6, 12), (randomByRange(0, 1) == 1) ? generateRandomString(1, 5) : "");
                }
                element.setAttribute(attributeName, "");
            }
        }

        obfuscatePageSource();
        setInterval(obfuscatePageSource, 2000);
    });

    // Activate all protections
    HtmlGuard.protections.antiDevTools();
    HtmlGuard.protections.blockContextMenu();
    HtmlGuard.protections.blockDrag();
    HtmlGuard.protections.blockSelection();
    HtmlGuard.protections.blockConsoleOutput();

    // Update time display
    document.getElementById("time").innerText = "Date and time: " + new Date().toLocaleString();
})();
