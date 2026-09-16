document.addEventListener('DOMContentLoaded', function() {
    const nextStageButton = document.getElementById('nextStage')
    const cancelButton = document.getElementById('stage-cancel')
    const tournamentDialog = document.getElementById('stage-dialog')

    const prevStageButton = document.getElementById('previousStage')
    const prevCancelButton = document.getElementById('previous-stage-cancel')
    const prevDialog = document.getElementById('previous-stage-dialog')

    const jogosTab = document.getElementById('jogos-tab');

    if (nextStageButton && jogosTab) {
        nextStageButton.style.maxWidth = '110px';
        nextStageButton.style.float = 'right';
        jogosTab.appendChild(nextStageButton);

        nextStageButton.addEventListener('click', function () {
            if (tournamentDialog) tournamentDialog.showModal()
        })

        if (cancelButton && tournamentDialog) {
            cancelButton.addEventListener('click', function () {
                tournamentDialog.close()
            })
        }
    }

    if (prevStageButton && jogosTab) {
        prevStageButton.style.maxWidth = '120px';
        prevStageButton.style.float = 'right';
        prevStageButton.style.marginRight = '8px';
        jogosTab.appendChild(prevStageButton);

        prevStageButton.addEventListener('click', function () {
            if (prevDialog) prevDialog.showModal()
        })

        if (prevCancelButton && prevDialog) {
            prevCancelButton.addEventListener('click', function () {
                prevDialog.close()
            })
        }
    }
})