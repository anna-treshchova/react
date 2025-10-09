import store from '@/store';
import { getProfileData } from '@/store/thunks/profileThunk.js';

async function profileInfoLoader() {
    try {
        await store.dispatch(getProfileData());
        return null
    } catch(err) {
        console.error('Failed to load profile data:', err.message);
        return null;
    }
}
export default profileInfoLoader;
