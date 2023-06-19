
document.addEventListener("DOMContentLoaded", () => {
            //Grabbing the Previous and Next buttons:
            const prevPage = document.getElementById("back")
            const nextPage = document.getElementById("forward")
            // Horrible creation of Elements to the HTML doc
            const monsterContainer = document.getElementById("monster-container")
            const createMonster = document.getElementById("create-monster")
            const createInputForm = document.createElement("Form")
            const createInputName = document.createElement("input")
            const createInputAge = document.createElement("input")
            const createInputDesc = document.createElement("input")
            const createInputBtn = document.createElement("button")
            const createInputTitle = document.createElement("h2")
            createInputName.placeholder = "Monster Name..."
            createInputAge.placeholder = "Monster Age..."
            createInputDesc.placeholder = "Monster Description..."
            createInputBtn.textContent = "submit"
            createInputTitle.textContent = "Create Monster:"
            createInputForm.append(createInputTitle, createInputName, createInputAge, createInputDesc, createInputBtn)
            createMonster.append(createInputForm)
            //Counter to show a limited amount of monsters per Page:
            let monstCounter = 1
            const monstersPerPage = 50
            fetch("http://localhost:3000/monsters")
            .then(res => res.json())
            .then((data) => {

                //Create the Index used for the Array of Monsters:
                let totalMonsters = data.length
                const totalPages = Math.ceil(totalMonsters / monstersPerPage)
                const startInd = (monstCounter - 1) * monstersPerPage
                const endInd = startInd + monstersPerPage
                const monsters = data.slice(startInd, endInd)
                generateMonsters(monsters)

            //Generates a User Created Monster:
            createInputForm.addEventListener("submit", (e) => {
                e.preventDefault()
                const newMonster = {
                    name: createInputName.value,
                    age: createInputAge.value,
                    description: createInputDesc.value
                }
                return fetch("http://localhost:3000/monsters", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newMonster)
                })
                .then(res => res.json())
                .then(data => {
                    generateMonsters([data])
                    console.log(data)
                })
            })

            //Generates the 50 Monsters from the DB
            
            prevPage.addEventListener("click", () => {
                if (monstCounter > 1) {
                    monstCounter--
                    monsterContainer.innerHTML = ""
                    const newStartInd = (monstCounter - 1) * monstersPerPage
                    const newEndInd = newStartInd + monstersPerPage
                    const newMonsters = data.slice(newStartInd, newEndInd)
                    generateMonsters(newMonsters)
                }
            })
            nextPage.addEventListener("click", () => {
                if (monstCounter < totalPages) {
                    monstCounter++
                    monsterContainer.innerHTML = ""
                    const newStartInd = (monstCounter - 1) * monstersPerPage
                    const newEndInd = newStartInd + monstersPerPage
                    const newMonsters = data.slice(newStartInd, newEndInd)
                    generateMonsters(newMonsters)
                }
            })
        })
        function generateMonsters(monsters) {
            monsters.forEach(monsters => {
                let monstNumber = monsters.id
                const monstName = monsters.name
                const monstAge = monsters.age
                const monstDescrip = monsters.description
                const monstH3 = document.createElement("h3")
                const monstAgep = document.createElement("p")
                const monstDescTitle = document.createElement("h5")
                monstH3.textContent = monstName
                monstAgep.textContent = `Age: ${monstAge}` 
                monstDescTitle.textContent = `Description: ${monstDescrip}`
                console.log(monstH3, monstAgep, monstDescTitle, monstCounter, monstNumber)
                monsterContainer.append(monstH3, monstAgep, monstDescTitle)
            })
        }

 }) 
