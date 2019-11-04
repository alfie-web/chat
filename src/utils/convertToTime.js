export default (duration) => {
            const mins = Math.floor(duration / 60);
            const secs = (duration % 60).toFixed();
            return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}