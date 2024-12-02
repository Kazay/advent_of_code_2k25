import {input} from './input.ts'
import {explodeLinebreaks, explodeWhitespaces} from "../helper.ts";

const reports = explodeLinebreaks(input);
const safeReports = reports.filter(report => isReportSafe(report));
const safeDampenedReports = reports.filter(report => isReportSafe(report, true));

console.log(`Number of safe reports : ${safeReports.length}`);
console.log(`Number of safe reports with the Problem Dampener : ${safeDampenedReports.length}`);

function isReportSafe(report: string, dampen: boolean = false): boolean {
    return areLevelsWithinTolerance(getLevels(report), dampen);
}

function areLevelsWithinTolerance(levels: number[], dampen: boolean = false): boolean {
    let increasing = false;
    let decreasing = false;

    for (let i = 1; i < levels.length; i++) {
        if (!increasing && levels[i] > levels[i - 1]) increasing = true;
        else if (!decreasing && levels[i] < levels[i - 1]) decreasing = true;

        const diff = Math.abs(levels[i] - levels[i - 1]);

        if ((diff < 1 || diff > 3) || (increasing && decreasing)) {
            if (!dampen) return false;

            return areLevelsWithinTolerance(filterIndex(levels, i))
                || areLevelsWithinTolerance(filterIndex(levels, i - 1))
                || areLevelsWithinTolerance(filterIndex(levels, i - 2));
        }
    }

    return true;
}

function getLevels(report: string): number[] {
    return explodeWhitespaces(report).map(val => parseInt(val));
}

function filterIndex(levels: number[], index: number): number[] {
    return levels.filter((_, j) => index !== j);
}