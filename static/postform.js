//Geef afbeeldingen weer als ze worden geüpload
const uploadInput = document.querySelector('input[type=file]')
const imageList = document.querySelector('.image-list')

let images = []

uploadInput.addEventListener('change', () => {

	if(uploadInput.files.length == 0) {
		return
	}

	for(let i = 0; i < uploadInput.files.length; i++) {
		images.push(uploadInput.files[i])
	}
	updateImages()
})

const updateImages = () => {

	let imageListElements = ''

	for(let i = 0; i < images.length; i++) {
		imageListElements += `
		<div class="upload-image-container">
			<img src="${URL.createObjectURL(images[i])}" alt="${images[i].name}"/ >
			<button type="button" data-index="${i}" onclick="deleteImage(this.dataset.index)">✕</button>
		</div>
		`
	}

	imageList.innerHTML = imageListElements

}

const deleteImage = (i) => {
	images.splice(i, 1)
	updateImages()
}



//Alle inputs
const nameInput = document.querySelector('#name')
const imageInput = document.querySelector('#images')
const ageInput = document.querySelector('#age')
const speciesInput = document.querySelector('#species')
const inquisitiveCheckbox = document.querySelector('#inquisitive')
const playfulCheckbox = document.querySelector('#playful')
const friendlyCheckbox = document.querySelector('#friendly')


const submitButton = document.querySelector('#submit')


submitButton.addEventListener('click', (event) => {

	event.preventDefault()

	if(emptyInput(nameInput)) {
		setInvalid(nameInput, 'Add the name of your pet.')
		return
	}

	setValid(nameInput)

	if(noImagesInArray(images)) {
		setInvalid(imageInput, 'You need to add at least one image.')
		return
	}

	setValid(imageInput)

	if(emptyInput(ageInput)) {
		setInvalid(ageInput, 'Add the age of your pet.')
		return
	}

	if(numberInputIsNegative(ageInput)) {
		setInvalid(ageInput, 'Age cannot be negative.')
		return
	}

	setValid(ageInput)

	if(emptyInput(speciesInput)) {
		setInvalid(speciesInput, `Select your pet's species`)
		return
	}

	setValid(speciesInput)

	submitButton.classList.add('loading')

	//Fetch variables

	let endPoint = '/post/submit'
	let formData = new FormData()

	//Set form data

	formData.append('name', nameInput.value)

	images.forEach(image => {
		formData.append('images', image)
	})

	formData.append('age', ageInput.value)
	formData.append('species', speciesInput.value)
	
	if(inquisitiveCheckbox.checked) {
		formData.append('trait', 'inquisitive')
	}

	if(playfulCheckbox.checked) {
		formData.append('trait', 'playful')
	}

	if(friendlyCheckbox.checked) {
		formData.append('trait', 'friendly')
	}

	//Post form with fetch

	fetch(endPoint, {
		method: 'POST',
		headers: {
			Accept: 'application/json'
		},
		body: formData
	}).then(response => response.json()).then(data => {
		if(data.success) {
			window.location.href = `/result/${data.id}`
		}
	})

})

/* Form validation set functions */

const setInvalid = (input, message) => {
	input.setCustomValidity(message)
	input.reportValidity()
}

const setValid = (input) => {
	input.setCustomValidity('')
	input.reportValidity()
}


/* Form validation check functions */

const emptyInput = (input) => {
	return input.value == ''
}

const inputIsNotText = (input) => {
	let regex = /[^A-Za-zÀ-ÖØ-öø-ÿ0-9!?\.,:\ \-|()'"\n]+/
	return {
		value: regex.test(input.value),
		reason: input.value.match(regex)
	}
}

const noImagesInArray = (imageArray) => {
	if(imageArray.length === 0) {
		return true
	} else {
		return false
	}
}

const numberInputIsNegative = (input) => {
	let regex = /-\d/
	return regex.test(input.value)
}