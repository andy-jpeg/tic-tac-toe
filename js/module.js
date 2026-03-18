const GameController = (function () {
    function Player(name, symbol) {
        this.name = name
        this.symbol = symbol
    }

    let player1 = null
    let player2 = null

    let formData = null

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

    let currentPlayer = null

    const display = document.querySelector('#display')
    const restart = document.querySelector('#restart')

    const form = document.querySelector('.form')
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const playerNames = new FormData(form)
        formData = playerNames // store previous names when restarting game

        const name1 = playerNames.get('player1')
        const name2 = playerNames.get('player2')

        if (!player1 && !player2) {
            player1 = new Player(name1, 'X')
            player2 = new Player(name2, 'O')

            currentPlayer = player1
        }

        form.style.display = 'none'
        display.textContent = currentPlayer.name + "'s turn!"
    })

    const tileList = document.querySelectorAll('.tile')
    tileList.forEach((button) => {
        button.addEventListener('click', function () {
            if (button.textContent == '' && player1 && player2) {
                button.textContent = currentPlayer.symbol

                changeTurn()
                checkPatterns()
            }
        })
    })

    function restartBoard() {
        tileList.forEach((button) => {
            button.textContent = ''
        })
    }

    restart.addEventListener('click', function () {
        if (!player1 && !player2) {
            // prevent unnecessary restarts
            const name1 = formData.get('player1')
            const name2 = formData.get('player2')

            player1 = new Player(name1, 'X')
            player2 = new Player(name2, 'O')

            currentPlayer = player1

            restartBoard()
            restart.style.visibility = 'hidden'

            display.textContent = currentPlayer.name + "'s turn!"
        }
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

        display.textContent = currentPlayer.name + "'s turn!"
    }

    function findPlayer(symbol) {
        if (player1.symbol == symbol) {
            return player1
        } else if (player2.symbol == symbol) {
            return player2
        }
    }

    function checkPatterns() {
        let winningPlayer = null
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
                winningPlayer = dominatingValue
                break
            }
        }

        if (winningPlayer) {
            winningPlayer = findPlayer(winningPlayer)
            display.textContent = winningPlayer.name + ' won!!'

            // prevent extra tile changes!

            player1 = null
            player2 = null

            restart.style.visibility = 'visible'
        } else {
            // check for full board!
            let isFull = true

            for (const value of values) {
                if (value == '') {
                    isFull = false
                }
            }

            if (isFull) {
                display.textContent = "It's a draw.."

                // prevent extra tile changes!

                player1 = null
                player2 = null

                restart.style.visibility = 'visible'
            }
        }
    }
})()
