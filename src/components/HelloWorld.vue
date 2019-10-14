<template>
    <div class="section">
        <h1 class="subtitle is-1 has-centered-text box has-text-centered">{{ currentTime.time12 }}</h1>
        <div class="buttons">
            <a ref="available" @click="available" class="button is-primary is-fullwidth is-large">Available</a>
            <a ref="notAvailable" @click="notAvailable" class="button is-danger is-fullwidth is-large">Not Available</a>
        </div>

        <div v-if="showSuccess" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-success">
                    <div class="message-header">
                        <p>Success</p>
                        <button @click="toggleSuccess" class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        Spreadsheet successfully updated!
                    </div>
                </article>
            </div>
        </div>

        <div v-if="showError" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>Error</p>
                        <button @click="toggleError" class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        There was an error while trying to update the Spreadsheet.
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import spreadsheet from '../js/spreadsheet';
import time from '../js/time';

export default {
    name: 'HelloWorld',
    data () {
        return {
            showSuccess: false,
            showError: false,
            currentTime: time.getCurrentTime()
        }
    },
    methods: {
        toggleSuccess(result) {
            this.showSuccess = !this.showSuccess;
        },
        toggleError(error) {
            this.showError = !this.showError;
        },
        available() {
            var available = this.$refs.available;
            available.classList.add('is-loading');

            spreadsheet.updateValue({
                currentTime: this.currentTime,
                isAvailable: true
            })
            .then(result => this.toggleSuccess(result))
            .catch(error => this.toggleError(error))
            .finally(() => {
                available.classList.remove('is-loading');
            });
        },
        notAvailable() {
            var notAvailable = this.$refs.notAvailable;
            notAvailable.classList.add('is-loading');

            spreadsheet.updateValue({
                currentTime: this.currentTime,
                isAvailable: false
            })
            .then(result => this.toggleSuccess(result))
            .catch(error => this.toggleError(error))
            .finally(() => {
                notAvailable.classList.remove('is-loading');
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
