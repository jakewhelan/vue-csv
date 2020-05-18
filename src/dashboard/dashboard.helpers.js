const isFolder = transfer => {
  const { items, files } = transfer

  if (!files.length) return true
  
  for (const item of items) {
    const entry = item.webkitGetAsEntry()
    if (entry?.isDirectory) return true
  }

  for (const { type, size } of files) {
    const isMultipleOf4096 = size % 4096 === 0

    if (!type && isMultipleOf4096) return true
  }
  
  return false
}

const tooManyFilesError = 'Sorry, only 1 file is allowed at a time'
const invalidFileError = 'Sorry, but the provided file is invalid'
const invalidExtensionError = 'Sorry, only .CSV files are allowed'
const getExtension = file => file.name.substring(file.name.lastIndexOf('.') + 1)

/**
 * Validates the provided data transfer
 * 
 * @param {DropEvent.FileTransfer} transfer 
 * @returns {{ file: File?, error: string? }}
 */
export const getDroppedCSV = transfer => {
  const moreThanOneFile = isFolder(transfer) || transfer.items.length > 1
  if (moreThanOneFile) return { file: null, error: tooManyFilesError }

  const [item] = transfer.items
  if (item.kind !== 'file') return { file: null, error: invalidFileError }

  const file = item.getAsFile()
  if (!file) return { file: null, error: invalidFileError }

  const extension = getExtension(file)
  if (extension !== 'csv') return { file: null, error: invalidExtensionError }

  return {
    file
  }
}

/**
 * Validates the provided files
 * 
 * @param {File[]} files
 */
export const getUploadedCSV = files => {
  const invalidFiles = files.length === 0 || !files[0]
  if (invalidFiles) return { file: null, error: invalidFileError }

  const moreThanOneFile = files.length > 1
  if (moreThanOneFile) return { file: null, error: tooManyFilesError }

  const [file] = files
  const extension = getExtension(file)
  if (extension !== 'csv') return { file: null, error: invalidExtensionError }

  return {
    file
  }
}
