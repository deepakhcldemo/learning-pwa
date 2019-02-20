import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import lstTelemetry, { Telemetry } from 'lst-telemetry';
import { TelemetryEventData } from '../../models/telemetry.model';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';
import { Promise } from 'q';
@Injectable()
export class TelemetryService {
    private exceptionInfo = {
        verb: 'http://activitystrea.ms/schema/1.0/experience',
        object: 'http://activitystrea.ms/schema/1.0/issue',
    };
    private baseEventData: {};
    telemetry: Telemetry;
    constructor(
        private userService: UserService,
    ) {
        this.initializeTelemetryService();
    }

    static telemetryBaseEventData(userService: UserService) {
        const userTheme = 'Standard';
        const currentDevice = new lstTelemetry.UAParser();
        const browserInfo = currentDevice.getResult();

        if (userService.getCurrentUser().idpResponse.data.assertion) {

            return {
                actor: {
                    id: userService.getCurrentUser().identityId,
                    role: userService.getCurrentUser().idpResponse.data.assertion.attributes.OrgRole1,
                },
                context: {
                    platform: FileConstants.constants.applicationPlatform,
                    learningExperience: userTheme,
                    environment: environment.production ? 'prod' : 'dev',
                    orgId: userService.getCurrentUser().idpResponse.data.assertion.attributes.OrganizationId1,
                    'browser-info': browserInfo,
                    deviceInfo: `${browserInfo.os.name} ${browserInfo.os.version}`,
                    'screen-size': `${window.screen.width}x${window.screen.height}`,
                    viewportSize: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
                },
            };
        }
    }

    initializeTelemetryService() {
        this.telemetry = new lstTelemetry({
            url: environment.telemetryUrl,
            method: 'POST',
            headers: {
                'x-api-key': environment.telemetryKey,
                'content-type': 'application/json',
            }
            // },
            // serviceWorkerPath: './TelemetrySW.js',
            // serviceWorker: {
            //     type: 'lst_sw_config',
            //     domain: 'realizedev',
            //     db: 'Telemetry'
            // }
        });
    }

    sendTelemetryEvent(activityData: TelemetryEventData): Promise<{}> {
        const eventData = Object.assign({}, this.getBaseTelemetryEvent(), activityData, {
            published: new Date().toISOString()
        });
        const objPromise = Promise((resolve, reject) => {
            resolve(null);
        });
        return objPromise;
        // this.telemetry.send(JSON.stringify(eventData));
    }

    /**
     * This function is used to format the telemetry service data for comment.
     *
     * @param assessmentDetail assessment detail object
     * @param studentUserId student id
     */
    formatTelemetryCommentObject(assessmentDetail, studentUserId) {
        return {
            verb: { id: FileConstants.constants.create },
            object: {
                extensions: {
                    assessment: {
                        type: FileConstants.constants.checklistTitle,
                        id: assessmentDetail.id,
                        name: assessmentDetail.title
                    },
                    student: studentUserId
                }, definition: { name: FileConstants.constants.assessmentComment }
            }
        };
    }

    /**
     * This function is used to format the telemetery service data for criteria.
     *
     * @param assessment assessment object
     */
    formatTelemetryCriteriaObject(assessment) {
        return {
            verb: { id: FileConstants.constants.check },
            object: {
                extensions: {
                    assessment: {
                        type: FileConstants.constants.observational,
                        id: assessment.id,
                        name: assessment.title
                    }
                }, definition: { name: FileConstants.constants.criteria }
            }
        };
    }

    /**
     * This function is used to format the telemetery service data for media.
     *
     * @param assessment assessment object.
     * @param studentUserId student id.
     * @param mediaType media file type.
     */
    formatTelemetryMediaObject(assessment, studentUserId, mediaType, type) {
        return {
            verb: { id: FileConstants.constants.attach },
            object: {
                extensions: {
                    assessment: {
                        type: type,
                        id: assessment.id,
                        name: assessment.title
                    },
                    student: studentUserId,
                    mediaType: mediaType
                }, definition: { name: FileConstants.constants.mediaTitle }
            }
        };
    }

    getBaseTelemetryEvent(): {} {
        if (!this.baseEventData) {
            this.baseEventData = TelemetryService.telemetryBaseEventData(this.userService);
        }
        return this.baseEventData;
    }

    sendTelemetryExceptionEvent(type: string, message: string, details?) {
        const activityDetails = {
            verb: {
                display: {
                    'en-US': 'experienced'
                },
                id: FileConstants.constants.experienced
            },
            object: {
                id: this.exceptionInfo.object,
                objectType: 'Activity',
                definition: {
                    name: {
                        'en-US': 'issue'
                    }
                }
            },
            result: {
                response: type,
                extensions: {
                    description: message,
                    stacktrace: details,
                }
            },
            published: new Date().toISOString(),
        };
        const eventData = Object.assign({}, this.getBaseTelemetryEvent(), activityDetails);
        const objPromise = Promise((resolve, reject) => {
            resolve(null);
        });
        return objPromise;
        // return this.telemetry.send(JSON.stringify(eventData));
    }
}
