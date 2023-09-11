import {differenceInCalendarDays,differenceInWeeks, format} from "date-fns";
import {Message} from "../../types";

export const isLastMessage = (messages: Message[], index: number) => {
    if(!messages) return false
    if(index === messages.length - 1){
        return true
    }
    if(messages[index + 1].sender._id !== messages[index].sender._id){
        return true
    }
    return false
}

export const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const now = new Date();
    const daysDifference = differenceInCalendarDays(now, date);
    const weeksDifference = differenceInWeeks(now, date);

    if (daysDifference < 1) {
        return format(date, 'HH:mm');
    } else if (weeksDifference < 1) {
        return format(date, 'E');
    } else {
        return format(date, 'dd.MM.yyyy');
    }
}