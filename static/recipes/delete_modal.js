/* delete_modal.js — shared delete modal */


/* set up the delete modal (if not already popped up) and provide open/close functions */
function ensureDeleteModal() {
  if (document.getElementById('delete-modal')) return;

  var overlay = document.createElement('div');
  overlay.id = 'delete-modal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML =
    '<div class="modal-box">' +
      '<h3>Delete Recipe</h3>' +
      '<p id="delete-modal-msg"></p>' +
      '<div class="modal-actions">' +
        '<button class="btn-modal-cancel" id="delete-modal-cancel">Cancel</button>' +
        '<button class="btn-modal-confirm" id="delete-modal-confirm">Delete</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('delete-modal-cancel').onclick = closeDeleteModal;
  overlay.onclick = function(e) { if (e.target === overlay) closeDeleteModal(); };
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeDeleteModal(); });
}


/* Opens the delete confirmation modal with the given recipe name and callback for when confirmed */
function openDeleteModal(recipeName, onConfirm) {
  document.getElementById('delete-modal-msg').textContent =
    'Are you sure you want to delete "' + recipeName + '"? This cannot be undone.';
  document.getElementById('delete-modal').classList.add('active');
  document.getElementById('delete-modal-confirm').onclick = function() {
    closeDeleteModal();
    onConfirm();
  };
}

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.remove('active');
}
