const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
//Find text used in note 
let activeNote = {};
//get all notes from database
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};
// save note to database
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};
// Delete from database
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};
// If active, display it, if not display empty area
const renderActiveNote = () => {
  $saveNoteBtn.hide();
  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};
// Get data, save it to the database & update
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// Delete note selected
const handleNoteDelete = function (event) {
  event.stopPropagation();
  const note = $(this).parent(".list-group-item").data();
  if (activeNote.id === note.id) {
    activeNote = {};
  }
  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// Display active note
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};
// Create new note after previous note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};
// If note title or text are empty, hide the save button, but if anything is display
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};
// Render's note title
const renderNoteList = (notes) => {
  $noteList.empty();
  const noteListItems = [];
  // Return jquery for list determined by text & delete button
  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);
    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };
  if (notes.length === 0) {
    noteListItems.push(create$li("No saved Notes", false));
  }
  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });
  $noteList.append(noteListItems);
};
// Get notes from database and render to the side
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
// Rendered Initial list
getAndRenderNotes();
