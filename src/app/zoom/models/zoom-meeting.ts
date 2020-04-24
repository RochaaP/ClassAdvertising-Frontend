import { ZoomMeetingSettings } from './zoom-meeting-settings';
import { ZoomMeetingRecurrence } from './zoom-meeting-recurrence';

export class ZoomMeeting {
    "topic": string;
    "type": number;
    "start_time": string;
    "duration": number;
    "timezone": string;
    "password": string;
    "agenda": string;
    "recurrence": ZoomMeetingRecurrence;
    "settings": ZoomMeetingSettings
    
}
