const Palette = (clicked) => {
    let mainArray = [
            "#333333",
            "#0000ff",
            "#000000",
            "#eeeeee",
            "#200371",
            "#333333",
            "#FFFAE2",
            "#2A2B2D",
            "#ADF0D1",
            "#2F2519",
            "#373A40",
            "#E8E8E8",
            "#120078",
            "#66AED6",
            "#FDCFDF",
            "#59886B",
            "#000000",
        ],
        subArray = [
            "#F2994A",
            "#ffff00",
            "#F2994A",
            "#F2994A",
            "#7BD9C1",
            "#68E52D",
            "#E7B70E",
            "#2EA8D9",
            "#2EA8D9",
            "#FA7D09",
            "#1995DA",
            "#F05454",
            "#9D0191",
            "#2037DE",
            "#FCA3CC",
            "#FFC85C",
            "#52057B",
        ],
        dsubArray = [
            "#F2724A",
            "#F2994A",
            "#ff0000",
            "#F2724A",
            "#83D97B",
            "#2DE58D",
            "#E7900E",
            "#2E68D9",
            "#2E68D9",
            "#FF4301",
            "#19D3DA",
            "#30475E",
            "#FD3A69",
            "#0085FF",
            "#BCE6EB",
            "#FFF8C1",
            "#BC6FF1",
        ],
        glArray = [
            "#ffffff",
            "#ffffff",
            "#cccccc",
            "#000000",
            "#F2F2F2",
            "#F2F2F2",
            "#333333",
            "#ffffff",
            "#00203F",
            "#eeeeee",
            "#eeeeee",
            "#222831",
            "#f2f2f2",
            "#FCF7F4",
            "#000000",
            "#FFF8C1",
            "#F4E0FF",
        ]
    let colorScheme
    if (clicked === true) {
        let oldScheme = +localStorage.getItem("colorScheme") || 0
        colorScheme = oldScheme > mainArray.length - 2 ? 0 : oldScheme + 1
    } else {
        colorScheme = +localStorage.getItem("colorScheme") || 0
    }

    function setScheme() {
        let root = document.documentElement
        root.style.setProperty("--main", mainArray[colorScheme])
        root.style.setProperty("--sub", subArray[colorScheme])
        root.style.setProperty("--dsub", dsubArray[colorScheme])
        root.style.setProperty("--gl", glArray[colorScheme])
        var alphaMain = hexToRgbA(mainArray[colorScheme])
        var alphaSub = hexToRgbA(subArray[colorScheme])
        root.style.setProperty("--alphaMain", alphaMain)
        root.style.setProperty("--alphaSub", alphaSub)
    }

    /*NAV BACKGROUND*/
    function hexToRgbA(hex) {
        var c
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split("")
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]]
            }
            c = "0x" + c.join("")
            return (
                "rgba(" +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
                ",.6)"
            )
        }
    }
    localStorage.setItem("colorScheme", colorScheme)
    setScheme()
}

export default Palette
