export function RightPanel() {
    return (
        <aside className="hidden lg:flex flex-col w-[320px] p-4 shrink-0 h-full overflow-y-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h2 className="text-lg font-bold mb-4">Trending Markets</h2>
                <div className="space-y-4">
                    <TrendItem symbol="BTC/USD" change="+5.2%" isUp={true} value="$64,320" />
                    <TrendItem symbol="SPX" change="-1.1%" isUp={false} value="5,123.40" />
                    <TrendItem symbol="NVDA" change="+2.4%" isUp={true} value="$882.10" />
                    <TrendItem symbol="XAU/USD" change="+0.8%" isUp={true} value="$2,340.50" />
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h2 className="text-lg font-bold mb-4">Active Traders</h2>
                <div className="space-y-3">
                    <TraderItem name="Alice Capital" handle="@alicecap" />
                    <TraderItem name="Bob Macro" handle="@bob_macro" />
                    <TraderItem name="Charlie Flow" handle="@charlieflow" />
                </div>
            </div>
        </aside>
    );
}

function TrendItem({ symbol, change, isUp, value }: { symbol: string, change: string, isUp: boolean, value: string }) {
    return (
        <div className="flex justify-between items-center cursor-pointer hover:bg-slate-800 p-2 -mx-2 rounded-lg transition-colors">
            <div>
                <div className="font-bold text-slate-200">{symbol}</div>
                <div className="text-xs text-slate-400">Vol: 1.2B</div>
            </div>
            <div className="text-right">
                <div className="font-mono text-sm">{value}</div>
                <div className={`text-xs font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>{change}</div>
            </div>
        </div>
    );
}

function TraderItem({ name, handle }: { name: string, handle: string }) {
    return (
        <div className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 relative">
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
                <div>
                    <div className="font-bold text-sm text-slate-200">{name}</div>
                    <div className="text-xs text-slate-400">{handle}</div>
                </div>
            </div>
            <button className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">Follow</button>
        </div>
    );
}
