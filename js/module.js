const GameController = (function () {
    function Player(name, symbol) {
        this.name = name
        this.symbol = symbol
    }

    const player1 = new Player('burg', 'X')
    const player2 = new Player('chicen', 'O')

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    let currentPlayer = player1

    const tileList = document.querySelectorAll('.tile')
    tileList.forEach((button) => {
        button.addEventListener('click', function () {
            if (button.textContent == '') {
                button.textContent = currentPlayer.symbol

                changeTurn()
                checkPatterns()
            }
        })
    })

    function retrieveValues() {
        const values = []

        tileList.forEach((button) => {
            values.push(button.textContent)
        })

        return values
    }

    function changeTurn() {
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }

        console.log(currentPlayer.name + "'s turn!!")
    }

    function checkPatterns() {
        console.log('checking if anyone won....')
        let winningCombo = null
        const values = retrieveValues()
        console.log(values)

        for (const combo of winningCombos) {
            let dominatingValue = null

            for (const position of combo) {
                const currentTile = values[position]

                if (currentTile != '') {
                    if (!dominatingValue) {
                        dominatingValue = currentTile // set initial dominatingValue
                    } else {
                        if (dominatingValue != currentTile) {
                            // different value = break loop!
                            dominatingValue = null
                            break
                        } // else... keep running!!
                    }
                } else {
                    // blank tile = no need to check :)
                    dominatingValue = null
                    break
                }
            }

            if (dominatingValue) {
                winningCombo = combo
                console.log(winningCombo)
                break
            }
        }

        if (winningCombo) {
            console.log('Bro someone won')
        } else {
            console.log('No wins JUST yet....')
        }
    }

    console.log('game controller start!')
    console.log(player1.name + ' goes first!')
})()
