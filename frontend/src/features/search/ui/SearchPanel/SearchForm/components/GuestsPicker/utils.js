import { pluralize } from '@/shared/utils'

export const buildGuestLabel = ({ guests, infants, pets }) => {
    let labelParts = [];

    if (guests) labelParts.push(pluralize(guests, 'guest'))
    if (infants) labelParts.push(pluralize(infants, 'infant'))
    if (pets) labelParts.push(pluralize(pets, 'pet'))

    return labelParts.join(', ');
}
