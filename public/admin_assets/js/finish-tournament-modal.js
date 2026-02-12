document.addEventListener('DOMContentLoaded', function() {
    const finishButton = document.getElementById('finish-tournament')
    const cancelButton = document.getElementById('tournament-cancel')
    const tournamentDialog = document.getElementById('tournament-dialog')

    if (finishButton) {
        finishButton.addEventListener('click', function () {
            tournamentDialog.showModal()
        })

        cancelButton.addEventListener('click', function () {
            tournamentDialog.close()
        })
    }

    // const saveButton = document.querySelector('#jazzy-actions .form-group [type="submit"]')
    // if (saveButton) {
    //     const buttonGroup = saveButton.parentNode
    //     const copyButton = saveButton.cloneNode(true)
    //     copyButton.style.position = 'fixed'
    //     copyButton.style.bottom = '10px'
    //     copyButton.style.right = '10px'
    //     copyButton.style.width = '100px'
    //     buttonGroup.appendChild(copyButton)
    // }
})
