
## Model Writeup (Twisting Pecking Order Theory)


### 1. What Does the Author Want to Show?

The author aims to develop a theoretical model rooted in the Pecking Order Theory of finance to explore how entrepreneurs choose between different financing options—self-financing, debt financing, and equity financing—under conditions of information asymmetry. The primary objectives of the paper are twofold:

- **Interpret Survey Experiment Results**: The model is designed to explain empirical findings from a survey experiment (though specific details of the survey are not provided in the text). It seeks to rationalize why entrepreneurs exhibit certain financing preferences based on their characteristics and market conditions.

- **Analyze Broader Implications**: Beyond the survey, the author investigates how information asymmetry and market structures lead to specific financing patterns, equilibrium outcomes, and potential market failures in equity markets.

Here’s a breakdown of the key points the author wants to demonstrate:

- **Modeling Financing Choices**: Entrepreneurs decide between self-financing, debt, or equity based on their ability ($\zeta$), cost of debt ($\rho$), and access to "good equity" (probability $\chi$). The model captures how these choices depend on individual traits and market conditions.

- **Role of Information Asymmetry**: The distinction between "good equity" (where ability is observable, no information asymmetry) and "pool equity" (where ability is unobservable, leading to information asymmetry) is central. This affects how entrepreneurs sort into financing options and influences market efficiency.

- **Equilibrium Analysis**: The author examines the equilibrium where entrepreneurs first decide whether to enter the market (comparing expected profits to an outside wage option $w$) and then choose their financing. This includes defining cutoffs for ability and cost of debt that determine financing preferences.

- **Market Failures and Adverse Selection**: The model highlights how low-ability entrepreneurs disproportionately enter the pool equity market, causing adverse selection. This reduces the average quality of the pool ($\bar{\zeta}$), making equity less attractive and potentially leading to market collapse under certain conditions.

- **Impact of the Outside Option**: An increase in the outside wage ($w$) raises the entry threshold, filtering out low-ability entrepreneurs. This improves the pool equity market’s quality, reducing adverse selection and enhancing efficiency.

In essence, the author wants to show how entrepreneurial financing decisions under information asymmetry lead to specific market outcomes, including inefficiencies, and uses this framework to interpret real-world observations while discussing broader implications like equity access and market failure.

---

### 2. Main Equations and Results

The paper defines several key equations to model profit functions and derives results about financing choices and market equilibrium. Below, I’ll explain the main equations and summarize the primary results.

#### Main Equations

1. **Profit Functions for Financing Options**:
   These equations represent the profits an entrepreneur earns under different financing strategies, depending on their ability ($\zeta$) and other parameters like the cost of debt ($\rho$), equity share ($\varepsilon$), and investors’ cost of capital ($\bar{\rho}$). The parameter $\alpha$ relates to production technology (e.g., a Cobb-Douglas exponent).

   - **Self-Financing**:
     $$
     \Pi_0(\zeta) = \zeta
     $$
     - Profit equals the entrepreneur’s ability, reflecting a simple "backyard technology" with no external funding.

   - **Debt Financing**:
     $$
     \Pi_d(\zeta, \rho) = \zeta^{\frac{1}{1-\alpha}} \rho^{-\frac{\alpha}{1-\alpha}} \left( \frac{1-\alpha}{\alpha} \right)
     $$
     - Derived from optimizing borrowed capital $K_b = \left(\frac{\zeta}{\rho}\right)^{\frac{1}{1-\alpha}}$, this shows profit increasing with ability and decreasing with the cost of debt.

   - **Good Equity Financing (Observable Type)**:
     $$
     \Pi_e(\zeta) = (1 - \varepsilon) \zeta^{\frac{1}{1-\alpha}} \left( \frac{\bar{\rho}}{\varepsilon} \right)^{-\frac{\alpha}{1-\alpha}}
     $$
     - For entrepreneurs who draw $\chi$ (good equity), profit depends on ability, adjusted by the equity share retained ($1 - \varepsilon$) and the investors’ cost of capital ($\bar{\rho}$).

   - **Pool Equity Financing (Unobservable Type)**:
     $$
     \Pi_e(\zeta, \bar{\zeta}) = (1 - \varepsilon) \zeta \bar{\zeta}^{\frac{\alpha}{1-\alpha}} \left( \frac{\bar{\rho}}{\varepsilon} \right)^{-\frac{\alpha}{1-\alpha}}
     $$
     - For those without $\chi$, profit depends on both their own ability ($\zeta$) and the average ability in the pool ($\bar{\zeta}$), reflecting information asymmetry’s impact.

2. **Expected Profit and Entry Condition**:
   - **Expected Profit**:

     $$
     \tilde{\Pi}(\zeta, \rho) = \chi \tilde{\Pi}_{\chi}(\zeta, \rho) + (1 - \chi) \tilde{\Pi}_{1-\chi}(\zeta, \rho)
     $$

     - Where $\tilde{\Pi}_\chi = \max\{\Pi_0, \Pi_e(\zeta), \Pi_d\}$ (with good equity) and $\tilde{\Pi}_{1-\chi} = \max\{\Pi_0, \Pi_e(\zeta, \bar{\zeta}), \Pi_d\}$ (with pool equity). This weighs the probability of drawing good equity ($\chi$).
   - **Entry Condition**:
     $$
     \tilde{\Pi}(\zeta, \rho) > w
     $$
     - Entrepreneurs enter if expected profit exceeds the outside wage.

3. **Cutoff Conditions**:
   - **Debt vs. Good Equity (if $\chi$)**:
     $$
     \rho < \bar{\rho} = \left( \frac{1-\alpha}{\alpha (1-\varepsilon)} \right)^{\frac{1-\alpha}{\alpha}} \frac{\bar{\rho}}{\varepsilon}
     $$
     - Entrepreneurs choose debt over good equity if their cost of debt is below this threshold.

   - **Debt vs. Pool Equity (if $1-\chi$)**:
     $$
     \hat{\zeta}(\rho) = \bar{\zeta} \frac{\rho}{\hat{\rho}}
     $$
     - Entrepreneurs with ability $\zeta > \hat{\zeta}(\rho)$ prefer debt over pool equity, where $\hat{\rho}$ is a parameter-derived threshold.

4. **Average Ability in Pool Equity**:
   $$
   \bar{\zeta} = \frac{\zeta_c + \hat{\zeta}}{2}, \quad \hat{\zeta} = \frac{\rho / \hat{\rho}}{2 - \rho / \hat{\rho}} \zeta_c
   $$
   - Assuming $\zeta$ is uniform, $\bar{\zeta}$ is the average ability of entrepreneurs in the pool, between the entry cutoff $\zeta_c$ and the debt-preference cutoff $\hat{\zeta}$.

5. **Entry Cutoff**:
   $$
   \zeta_c = \left[ \frac{w}{(1-\varepsilon) \left( \frac{\bar{\rho}}{\varepsilon} \right)^{-\frac{\alpha}{1-\alpha}} \left[ \chi + (1-\chi) (2 - \rho / \hat{\rho})^{-\frac{\alpha}{1-\alpha}} \right]} \right]^{\frac{1-\alpha}{\alpha}}
   $$
   - This determines the minimum ability required to enter the market, increasing with $w$.

#### Main Results

1. **Impact of the Outside Option ($w$)**:
   - A higher $w$ increases $\zeta_c$, raising the entry threshold. This excludes low-ability entrepreneurs, increasing $\bar{\zeta}$ and improving the pool equity market’s quality. It reduces adverse selection, making equity more attractive.

2. **Existence of the Pool Equity Market**:
   - The pool equity market exists if $\rho / \hat{\rho} > 1$, where $\hat{\zeta} > \zeta_c$. If $w$ is too low (e.g., $w = 0$), $\zeta_c = \hat{\zeta} = 0$, and the market disappears as all entrepreneurs enter, collapsing quality.

3. **Adverse Selection in Equity Markets**:
   - High-ability entrepreneurs ($\zeta > \hat{\zeta}$) prefer debt or good equity, leaving pool equity dominated by lower-ability types. This lowers $\bar{\zeta}$, reducing capital supply and market attractiveness, illustrating an adverse selection problem.

4. **Equilibrium Financing Choices**:
   - Entrepreneurs with $\chi$ choose debt if $\rho < \bar{\rho}$, otherwise good equity. Without $\chi$, those with $\zeta > \hat{\zeta}(\rho)$ choose debt, others pool equity or self-finance, reflecting a pecking order modified by information asymmetry.

5. **Market Failure Implications**:
   - The dominance of low-quality entrants in pool equity leads to market inefficiencies. Equity is desirable but inaccessible to many due to information asymmetry and selection issues, concentrating it among those with $\chi$.
